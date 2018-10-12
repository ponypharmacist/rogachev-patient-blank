//=========================================
// Made by Dmitry Glinskiy,
// contact me at glinskiy.net
//=========================================
// Helper functions
//=========================================
var getSumm = (a,b) => a + b,
    range = (x, min, max) => x >= min && x <= max,
    rangeShort = (x, min, max) => x >= min && x < max;

//=========================================
// Калькуляторы параметров пациента
// для которых есть простые формулы
//=========================================
// Body Mass Index / индекс массы тела
function calculateBMI () {
  patient.bmi = (patient.weight / (patient.height * patient.height / 10000)).toFixed(2);
  $('#bmi').val(patient.bmi);
};

// Waist-Hip-Ratio / соотношение талия-бедра
function calculateWHR () {
  patient.whr = (patient.waistLength / patient.hipLength).toFixed(2);
  $('#whr').val(patient.whr);
};


//=========================================
// Основные реакции на изменения полей
//=========================================
$(document).ready(function(){

  // Считаем Body Mass Index (BMI)
  $('#weight').on('change', function() {
    patient.weight = parseFloat(this.value);
    patient.weight && patient.height && calculateBMI();
  });

  $('#height').on('change', function() {
    patient.height = parseFloat(this.value);
    patient.weight && patient.height && calculateBMI();
  });

  // Считаем Waist-Hip-Ratio (WHR)
  $('#waistLength').on('change', function() {
    patient.waistLength = parseFloat(this.value);
    patient.waistLength && patient.hipLength && calculateWHR();
  });

  $('#hipLength').on('change', function() {
    patient.hipLength = parseFloat(this.value);
    patient.waistLength && patient.hipLength && calculateWHR();
  });

  // Считаем % от массы тела для жира, костей и активной клеточной массы
  // UNUSED: Убрали, потому что удалили антропометрию
  $('.calculate-percentage').on('change', function() {
    let targetCell = $(this).attr('id');
    let calculatedPercentage = (parseFloat(this.value) / patient.weight * 100).toFixed(1) + '%';
    $('#percentage-' + targetCell).val(calculatedPercentage);
  });

});

//==================================================================================
// Функции, выбирающие и вставляющие значение на основании названия параметра
// и имени таблицы возрастных диапазонов
//==================================================================================
// Выставляем референсные значения
//=========================================
function fillReferenceValues() {
  console.log('Started filling reference values.');
  fillReferenceInterval('height', 'ageRange_height', ' см');
  fillReferenceInterval('weight', 'ageRange_height', ' кг');
  fillReferenceInterval('bmi', 'ageRange_bmi', '');
  fillReferenceWHR();
  console.log('Finished filling reference values.');
}

function fillReferenceInterval (parameterName, ageRangeTable, unit) {
  let referenceTable = 'table_' + parameterName + '_' + patient.gender;
  let referenceTableIndex = getAgeGroup(ageRangeTable);
  let referenceInterval = references[referenceTable][referenceTableIndex];
  $('#reference-' + parameterName).val(referenceInterval[0] + ' - ' + referenceInterval[1] + unit);
  validation[parameterName] = [referenceInterval[0],referenceInterval[1]];
};

function getAgeGroup (ageRangeTable) {
  for (let index = 0; index < references[ageRangeTable].length - 1; index++) {
    if (rangeShort(patient.ageConverted, references[ageRangeTable][index], references[ageRangeTable][index + 1])) {
      return index;
    } else {
    };
  };
};

//=========================================
// Выставляем процентили
//=========================================
function fillPercentile (parameterName, categoryName) {
  let patientParameterValue = $('#' + parameterName).val();
  let parametersTable = 'table_' + parameterName + '_' + patient.gender;
  let ageRangeForCategory = 'ageRangeTable' + categoryName;
  let parametersTableIndex = getAgeGroup(ageRangeForCategory);
  let parameterValuesArray = references[parametersTable][parametersTableIndex];
  let percentileInterval = getPercentile(patientParameterValue, parameterValuesArray, categoryName);
  $('#percentile-' + parameterName).val(percentileInterval);
};

// Сканер массива параметров
function getPercentile (patientParameterValue, parameterValuesArray, categoryName) {
  let index;
  let percentilesTableName = ('percentiles' + categoryName);
  for (index = 0; index < parameterValuesArray.length - 1; index++) {
    if (rangeShort(patientParameterValue, parameterValuesArray[index], parameterValuesArray[index + 1])) {
      return references[percentilesTableName][index];
    } else {
    };
  };
};

//=========================================
// WHR
//=========================================
function fillReferenceWHR () {
  if (patient.gender == 'male') {
    $('#reference-whr').val('< 0.85');
  } else {
    $('#reference-whr').val('< 0.75');
  };
};
