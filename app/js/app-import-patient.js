//=========================================
// Export & Import patient instrument
//=========================================
$(document).ready(function(){
  // Кнопка для вывода объекта в виде stringify
  $('#show-patient-stringify').click(function(){
    $('#debug-textarea').val(JSON.stringify(patient, "", 2));
  });

  // Кнопка для конверсии JSON string в объект пациента и заполнение всех полей из памяти
  $('#remember-patient').click(function(){
    var restoredPatient = $('#debug-textarea').val();
    patient = JSON.parse(restoredPatient);
    for (const prop in patient) {
      $('#' + prop).val(patient[prop]);
    };

    patient.gender && patient.ageConverted && fillReferenceValues();
    recalculatePercentage();
    refillCopiedFields();
    refillSignatures();
    refillPercentiles();
  });

  $('#make-table').click(function(){
    for (const prop in patient) {
      $('#export-' + prop).html(patient[prop]);
    };
  });
});

//=========================================
// Вспоминаем рассчеты при импорте пациента
//=========================================
function recalculatePercentage() {
  let percentageInputs = ['massFat', 'massLean', 'massSkeletalMuscle', 'massActiveCellular'];
  percentageInputs.forEach(function(field, i, percentageInputs) {
    if ( patient[field] >= 0 ) {
      let calculatedPercentage = (parseFloat($('#' + field).val()) / patient.weight * 100).toFixed(1) + '%';
      $('#percentage-' + field).val(calculatedPercentage);
    } else {
      // если нет данных в поле
    };
  });
};

//=========================================
// Вспоминаем копируемые поля при импорте пациента
//=========================================
function refillCopiedFields() {
  let copiedInputs = ['fullName','idNumber','gender','ageYears','ageMonths','diagnosisMKB'];
  copiedInputs.forEach(function(field, i, copiedInputs) {
    let copiedString = $('#' + field).val();
    $('.' + field + '-copy').html(copiedString);
  });
  pasteRussianGender();
};


//=========================================
// Вспоминаем подписи при импорте пациента
//=========================================
function refillSignatures() {
  let signatureInputs = ['doctor-a1', 'doctor-a2', 'doctor-a3', 'doctor-b1-1', 'doctor-b1-2', 'doctor-b2-1', 'doctor-b2-2'];
  signatureInputs.forEach(function(field, i, signatureInputs) {
    let selectedDoctor = $('#' + field).val();
    $("#signature-" + field).attr('class', selectedDoctor);
  });
};

//=========================================
// Вспоминаем процентили при импорте пациента
//=========================================
function refillPercentiles() {
  let percentileParameters = [
    ['handStrengthLeft','PhysicalAttributes'],
    ['handStrengthRight','PhysicalAttributes'],
    ['legStrengthLeft','PhysicalAttributes'],
    ['legStrengthRight','PhysicalAttributes'],
    ['backStrength','PhysicalAttributes'],
    ['abdominalPress','PhysicalAttributes'],
    ['spineFlexibility','PhysicalAttributes']
  ];
  percentileParameters.forEach(function(pair, i, percentileParameters) {
    if ( patient[pair[0]] >= 0 ) {
      console.log(patient[pair[0]]);
      fillPercentile(pair[0],pair[1]);
    } else {
      // если нет параметра
    }
  });
};
