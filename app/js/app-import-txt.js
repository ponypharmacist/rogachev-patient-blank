//=========================================
// Export TXT file instrument
//=========================================
$(document).ready(function(){
  $('#make-file').click(function(){
    makeTable();
    var incomingText = $('#debug-textarea').val();
    console.log('Incoming Text: ' + incomingText);
    $('#download-file').attr("href", makeTextFile(incomingText));

    let now = new Date();
    let fileDate = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
    $('#download-file').attr("download", (patient.idNumber ? patient.idNumber + ' - ' : '') + (patient.fullName ? patient.fullName + ' ' : '') + fileDate + '.txt');
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

  '\nОкружность плеча (см, левое)	' + txtGen('circumShoulderLeft') +
  '\nОкружность плеча (см, правое)	' + txtGen('circumShoulderRight') +
  '\nОкружность бедра (см, левое)	' + txtGen('circumThighLeft') +
  '\nОкружность бедра (см, правое)	' + txtGen('circumThighRight') +
  '\nОкружность голени (см, левое)	' + txtGen('circumShinLeft') +
  '\nОкружность голени (см, правое)	' + txtGen('circumShinRight') +
  '\nОкружность грудной клетки на вдохе (см)	' + txtGen('circumChestInsp') +
  '\nОкружность грудной клетки на выдохе (см)	' + txtGen('circumChestExp') +

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

  '\nЧСС (уд/мин), исходно	' + txtGen('walkA1') +
  '\nЧСС (уд/мин), сразу после теста	' + txtGen('walkA2') +
  '\nЧСС (уд/мин), через 3 минуты	' + txtGen('walkA3') +
  '\nЧСС (уд/мин), через 5 минут	' + txtGen('walkA4') +

  '\nЧД (в мин), исходно	' + txtGen('walkB1') +
  '\nЧД (в мин), сразу после теста	' + txtGen('walkB2') +
  '\nЧД (в мин), через 3 минуты	' + txtGen('walkB3') +
  '\nЧД (в мин), через 5 минут	' + txtGen('walkB4') +

  '\nАДС (мм.рт.ст.), исходно	' + txtGen('walkC1') +
  '\nАДС (мм.рт.ст.), сразу после теста	' + txtGen('walkC2') +
  '\nАДС (мм.рт.ст.), через 3 минуты	' + txtGen('walkC3') +
  '\nАДС (мм.рт.ст.), через 5 минут	' + txtGen('walkC4') +

  '\nАДД (мм.рт.ст.), исходно	' + txtGen('walkD1') +
  '\nАДД (мм.рт.ст.), сразу после теста	' + txtGen('walkD2') +
  '\nАДД (мм.рт.ст.), через 3 минуты	' + txtGen('walkD3') +
  '\nАДД (мм.рт.ст.), через 5 минут	' + txtGen('walkD4') +

  '\nСатурация О2 (%), исходно	' + txtGen('walkE1') +
  '\nСатурация О2 (%), сразу после теста	' + txtGen('walkE2') +
  '\nСатурация О2 (%), через 3 минуты	' + txtGen('walkE3') +
  '\nСатурация О2 (%), через 5 минут	' + txtGen('walkE4') +

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

  '\nВедущая рука (письмо)	' + txtGen('primary-hand-writing-b1') +
  '\nВедущая рука (бросок)	' + txtGen('primary-hand-throwing-b1') +
  '\nВедущая ступня/нога	' + txtGen('primary-leg-b1') +
  '\nТип отжиманий	' + txtGenPushupsType() +
  '\nОбщий балл BOT-short	' + txtGenInput('subtest-bs-score') +
  '\nПодпись BOT-short	' + txtGen('doctor-b1-1') +
  '\nДата BOT-short	' + txtGen('date-b1') +

  '\nВедущая рука (письмо) BOT2	' + txtGen('primary-hand-writing-b2') +
  '\nВедущая рука (бросок) BOT2	' + txtGen('primary-hand-throwing-b2') +
  '\nВедущая ступня/нога BOT2	' + txtGen('primary-leg-b2') +

  '\nТочность мелкой моторики	' + txtGenInput('bot2-score-1') +
  '\nИнтеграция мелкой моторики	' + txtGenInput('bot2-score-2') +
  '\nЛовкость рук	' + txtGenInput('bot2-score-3') +
  '\nКоординация верх. конечн.	' + txtGenInput('bot2-score-4') +
  '\nБилатеральные навыки	' + txtGenInput('bot2-score-5') +
  '\nБаланс	' + txtGenInput('bot2-score-6') +
  '\nСкорость бега и ловкость	' + txtGenInput('bot2-score-7') +
  '\nОтжимания	' + txtGenInput('bot2-score-8') +

  '\nТип отжиманий BOT2	' + txtGenPushupsTypeBOT2() +
  '\nПодпись BOT2	' + txtGen('doctor-b2-1') +
  '\nДата BOT2	' + txtGen('date-b2') +

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

function txtGenPushupsType() {
  let selectValue = $('#subtest-bs-select').val();
  if (selectValue == 1) {
    return 'Отжимания с колен';
  } else {
    return 'Полные отжимания';
  }
};

function txtGenPushupsTypeBOT2() {
  let selectValue = $('#subtest-bs-select').val();
  if (selectValue == 1) {
    return 'Отжимания с колен';
  } else {
    return 'Полные отжимания';
  }
};
