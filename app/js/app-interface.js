//=========================================
// Made by Dmitry Glinskiy,
// contact me at glinskiy.net
//=========================================
// Patient object
//=========================================
var patient = {}

//=========================================
// Основные реакции на изменения полей
//=========================================
$(document).ready(function(){

  // Кнопки для скрытия элементов
  $('.element-remover').click(function(){
    var removeTarget = $(this).attr('id');
    $('.is-' + removeTarget).hide();
  });

  // Обновление объекта пациента
  $('.update-object').on('change', function() {
    let updatedParameter = $(this).attr('id');
    let updatedParameterValue = $(this).val();
    console.log('Updated "' + updatedParameter + '" with: ' + updatedParameterValue);
    patient[updatedParameter] = updatedParameterValue;
  });

  // Копирование полей пациента на другие страницы
  $('.copied-field').on('change', function() {
    var copyTarget = $(this).attr('id');
    $('.' + copyTarget + '-copy').html(this.value);
  });


  // Реагируем на смену возраста
  $('#ageYears').on('change', function() {
    patient.ageYears = parseInt(this.value);
    patient.ageMonths = parseInt($('#ageMonths').val());
    patient.ageConverted = patient.ageYears * 12 + patient.ageMonths;

    patient.gender && patient.ageConverted && fillReferenceValues() && choosePrimaryTable() && chooseSecondaryTable() && chooseBotShortTable();
  });

  // Реагируем на смену возраста
  $('#ageMonths').on('change', function() {
    patient.ageMonths = parseInt(this.value);
    patient.ageYears = parseInt($('#ageYears').val());
    patient.ageConverted = patient.ageYears * 12 + patient.ageMonths;

    patient.gender && patient.ageConverted && fillReferenceValues() && choosePrimaryTable() && chooseSecondaryTable() && chooseBotShortTable();
  });

  // Реагируем на смену пола
  $('#gender').on('change', function() {
    patient.gender = $('#gender').val();
    pasteRussianGender();
    patient.gender && patient.ageConverted && fillReferenceValues() && choosePrimaryTable() && chooseSecondaryTable() && chooseBotShortTable();
  });


  // Ставим подписи специалистов
  $('.doctor-select').on('change', function() {
    let selectedDoctor = $(this).val();
    let targetSignature = $(this).attr('id');
    $("#signature-" + targetSignature).attr('class',selectedDoctor);
  });

});

// Вставляет русское название пола, на основе value выбранного пола в селекте
function pasteRussianGender() {
  if (patient.gender == 'male') {
    genderSelectedRus = 'Мужской';
  } else if (patient.gender == 'female') {
    genderSelectedRus = 'Женский';
  } else {
    genderSelectedRus = 'Ошибочка, не выбран пол!';
  }
  $('.gender-copy').html(genderSelectedRus);
};
