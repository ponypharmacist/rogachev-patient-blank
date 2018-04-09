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

  $('#make-file').click(function(){
    var incomingText = $('#debug-textarea').val();
    console.log('Incoming Text: ' + incomingText);
    $('#download-file').attr("href", makeTextFile(incomingText));
  });
});

var textFile = null;

function makeTextFile (text) {
  var textFiledata = new Blob([text], {
    type: 'text/plain'
  });
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(textFiledata);
  return textFile;
};


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

//=========================================
// Генерируем текст с данными пациента
//=========================================
$(document).ready(function(){
  $('#make-table').click(function(){
    var txtTableText = 'ID номер	' + patient.idNumber +
    '\nИмя	' + patient.fullName +
    '\nПол	' + patient.gender +
    '\nВозраст (мес.)	' + patient.ageConverted +
    '\nКатегория	' + patient.category +
    '\nДиагноз МКБ	' + patient.diagnosisMKB +
    '\nРост	' + patient.height +
    '\nРост сидя	' + patient.heightSitting +
    '\nВес	' + patient.weight +
    '\nИндекс массы тела	' + patient.bmi +
    '\nОхват талии	' + patient.waistLength +
    '\nОхват бедер	' + patient.hipLength +
    '\nОтношение талия-бедра	' + patient.whr +
    '\nЭкскурсия грудной клетки (см)	' + patient.chestExcursion +
    '\nРазница в относительной длине ног (см)	' + patient.legLengthDifferenceRelative +
    '\nРазница в абсолютной длине ног (см)	' + patient.legLengthDifferenceAbsolute +
    '\nДеформации грудной клетки	' + patient.chestDeformation +
    '\nСагиттальные отклонения оси позвоночника	' + patient.spineAxisSaggitalDeviation +
    '\nПерекос таза	' + patient.pelvicTilt +
    '\nТип дыхания	' + patient.breathingType +
    '\nДеформация стоп	' + patient.footDeformation +
    '\nШейный лордоз	' + patient.neckLordosis + 
    '\nГрудной кифоз	' + patient.chestKyphosi + 
    '\nПоясничный лордоз	' + patient.waistLordosi +
    '\nВыпрямленная спина	' + patient.straightBack +
    '\nФизическое развитие	' + patient.conclusionAPhysicalDevelopment +
    '\nПризнаки висцерального ожирения	' + patient.conclusionAVisceralObesitySigns +
    '\nПропорции тела	' + patient.conclusionABodyProportions +
    '\nТип дыхания	' + patient.conclusionABreathType +
    '\nДеформации опорно-двигательного аппарата	' + patient.conclusionASkeletalDeformations;

    $('#debug-textarea').val(txtTableText);
  });
});
