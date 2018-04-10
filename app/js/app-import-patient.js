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
    makeTable();
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
    ['spineFlexibility','PhysicalAttributes'],
    ['walkDistance','PhysicalLoad']
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
function makeTable() {
  var txtTableText = 'ID номер	' + txtGen('idNumber') +
  '\nИмя	' + txtGen('fullName') +
  '\nПол	' + txtGen('gender') +
  '\nВозраст (мес.)	' + txtGen('ageConverted') +
  '\nКатегория	' + txtGen('category') +
  '\nДиагноз МКБ	' + txtGen('diagnosisMKB') +

  '\nРост	' + txtGen('height') +
  '\nРост сидя	' + txtGen('heightSitting') +
  '\nВес	' + txtGen('weight') +
  '\nИндекс массы тела	' + txtGen('bmi') +
  '\nОхват талии	' + txtGen('waistLength') +
  '\nОхват бедер	' + txtGen('hipLength') +
  '\nОтношение талия-бедра	' + txtGen('whr') +
  '\nЭкскурсия грудной клетки (см)	' + txtGen('chestExcursion') +
  '\nРазница в относительной длине ног (см)	' + txtGen('legLengthDifferenceRelative') +
  '\nРазница в абсолютной длине ног (см)	' + txtGen('legLengthDifferenceAbsolute') +
  '\nКалиперометрия	' + txtGen('caliperometry') +
  '\nФронтальные отклонения оси позвоночника	' + txtGen('spineAxisFrontalDeviation') +
  '\nПерекос таза	' + txtGen('pelvicTilt') +
  '\nТип дыхания	' + txtGen('breathingType') +
  '\nДеформация стоп	' + txtGen('footDeformation') +
  '\nШейный лордоз	' + txtGen('neckLordosis') +
  '\nГрудной кифоз	' + txtGen('chestKyphosi') +
  '\nПоясничный лордоз	' + txtGen('waistLordosi') +
  '\nВыпрямленная спина	' + txtGen('straightBack') +

  '\nФизическое развитие	' + txtGen('conclusionAPhysicalDevelopment') +
  '\nПризнаки висцерального ожирения	' + txtGen('conclusionAVisceralObesitySigns') +
  '\nПропорции тела	' + txtGen('conclusionABodyProportions') +
  '\nТип дыхания	' + txtGen('conclusionABreathType') +
  '\nДеформации опорно-двигательного аппарата	' + txtGen('conclusionASkeletalDeformations') +

  '\nПодпись А1	' + txtGen('doctor-a1') +
  '\nДата А1	' + txtGen('date-a1') +

  '\nОтведение плеча с лопаткой (левое, град.)	' + txtGen('angleShoulderMovementLeft') +
  '\nОтведение плеча с лопаткой (правое, град.)	' + txtGen('angleShoulderMovementRight') +
  '\nСгибание в локтевом суставе (левое, град.)	' + txtGen('angleElbowBendLeft') +
  '\nСгибание в локтевом суставе (правое, град.)	' + txtGen('angleElbowBendRight') +
  '\nРазгибание предплечья (левое, град.)	' + txtGen('angleForearmBendLeft') +
  '\nРазгибание предплечья (правое, град.)	' + txtGen('angleForearmBendRight') +
  '\nСгибание в тазобедренном суставе (левое, град.)	' + txtGen('anglePelvisJointBendLeft') +
  '\nСгибание в тазобедренном суставе (правое, град.)	' + txtGen('anglePelvisJointBendRight') +
  '\nСгибание в коленном суставе (левое, град.)	' + txtGen('angleKneeJointBendLeft') +
  '\nСгибание в коленном суставе (правое, град.)	' + txtGen('angleKneeJointBendRight') +
  '\nСгибание в голеностопном суставе (левое, град.)	' + txtGen('angleAnkleJointBendLeft') +
  '\nСгибание в голеностопном суставе (правое, град.)	' + txtGen('angleAnkleJointBendRight') +

  '\nМышцы рук (левая, сек)	' + txtGen('handStrengthLeft') +
  '\nМышцы рук (левая, процентиль)	' + txtGenInput('percentile-handStrengthLeft') +
  '\nМышцы рук (правая, сек)	' + txtGen('handStrengthRight') +
  '\nМышцы рук (правая, процентиль)	' + txtGenInput('percentile-handStrengthRight') +
  '\nМышцы ног (левая, сек)	' + txtGen('legStrengthLeft') +
  '\nМышцы ног (левая, процентиль)	' + txtGenInput('percentile-legStrengthLeft') +
  '\nМышцы ног (правая, сек)	' + txtGen('legStrengthRight') +
  '\nМышцы ног (правая, процентиль)	' + txtGenInput('percentile-legStrengthRight') +
  '\nСила кисти (левая, кг)	' + txtGen('palmStrengthLeft') +
  '\nСила кисти (правая, кг)	' + txtGen('palmStrengthRight') +
  '\nМышцы спины (сек)	' + txtGen('backStrength') +
  '\nМышцы спины (процентиль)	' + txtGenInput('percentile-backStrength') +
  '\nМышцы брюшного пресса (сек)	' + txtGen('abdominalPress') +
  '\nМышцы брюшного пресса (процентиль)	' + txtGenInput('percentile-abdominalPress') +
  '\nСтановая сила (кг)	' + txtGen('deadlift') +
  '\nСтановая сила (процентиль)	' + txtGenInput('percentile-deadlift') +
  '\nГибкость позвоночника (см)	' + txtGen('spineFlexibility') +
  '\nГибкость позвоночника (процентиль)	' + txtGenInput('percentile-spineFlexibility') +

  '\nПройденное расстояние (м)	' + txtGen('walkDistance') +
  '\nВремя восстановления кардиореспираторных показателей (мин)	' + txtGen('cardiorespiratoryRestorationTime') +

  '\nОбъем движений изменен в суставах	' + txtGen('conclsionBMovementLimitedInJoints') +
  '\nСиловая выносливость	' + txtGen('conclsionBStrengthEndurance') +
  '\nПереносимость физических нагрузок	' + txtGen('conclsionBPhysicalLoadEndurance') +

  '\nПодпись А2	' + txtGen('doctor-a2') +
  '\nДата А2	' + txtGen('date-a2') +

  '\nСмещение по фронтали (глаза открыты, мм)	' + txtGen('shiftFrontalEyesOpen') +
  '\nСмещение по фронтали (глаза закрыты, мм)	' + txtGen('shiftFrontalEyesClosed') +
  '\nСмещение по сагиттали (глаза открыты, мм)	' + txtGen('shiftSaggitalEyesOpen') +
  '\nСмещение по сагиттали (глаза закрыты, мм)	' + txtGen('shiftSaggitalEyesClosed') +
  '\nПлощадь эллипса (глаза открыты, мм2)	' + txtGen('ellipseSquareEyesOpen') +
  '\nПлощадь эллипса (глаза закрыты, мм2)	' + txtGen('ellipseSquareEyesClosed') +
  '\nСредняя скорость центра давления (глаза открыты, мм2)	' + txtGen('pressurePointSpeedEyesOpen') +
  '\nСредняя скорость центра давления (глаза закрыты, мм2)	' + txtGen('pressurePointSpeedEyesClosed') +

  '\nПоложение центра давления	' + txtGen('conclusionCPressureCenterPosition') +
  '\nСтабильность баланса	' + txtGen('conclusionCBalanceStability') +
  '\nПриоритетная сенсорная система	' + txtGen('conclusionCPrimarySensoricSystem') +

  '\nЖировая масса (кг)	' + txtGen('massFat') +
  '\nЖировая масса (%)	' + txtGenInput('percentage-massFat') +
  '\nТощая масса (кг)	' + txtGen('massLean') +
  '\nТощая масса (%)	' + txtGenInput('percentage-massLean') +
  '\nСкелетно-мышечная масса (кг)	' + txtGen('massSkeletalMuscle') +
  '\nСкелетно-мышечная масса (%)	' + txtGenInput('percentage-massSkeletalMuscle') +
  '\nАктивная клеточная масса (кг)	' + txtGen('massActiveCellular') +
  '\nАктивная клеточная масса (%)	' + txtGenInput('percentage-massActiveCellular') +
  '\nФазовый угол (градусы)	' + txtGen('phasicAngle') +

  '\nУровень готовности к физическим нагрузкам	' + txtGen('conclusionDPhysicalLoadReadinessLevel') +
  '\nУровень двигательной активности	' + txtGen('conclusionDPhysicalActivityLevel') +
  '\nРиск развития метаболического синдрома	' + txtGen('conclusionDMetabolicSyndromDevelopmentRisk') +

  '\nПодпись А3	' + txtGen('doctor-a3') +
  '\nДата А3	' + txtGen('date-a3') +

  '';

  $('#debug-textarea').val(txtTableText);
};

function txtGen(parameter) {
  let noData = '-';
  let txtString = patient[parameter] ? patient[parameter] : noData;
  return txtString;
};

function txtGenInput(id) {
  let noData = '-';
  let inputData = $('#' + id).val();
  let txtString = inputData ? inputData : noData;
  return txtString;
};
