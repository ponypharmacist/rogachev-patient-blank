//=========================================
// Made by Dmitry Glinskiy,
// contact me at glinskiy.net
//=========================================
// Helper functions
//=========================================
function getSumm(a,b) {
  return a + b;
};

function range(x, min, max) {
  return x >= min && x <= max;
};

function rangeShort(x, min, max) {
  return x >= min && x < max;
};

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
  $('.calculate-percentage').on('change', function() {
    let targetCell = $(this).attr('id');
    let calculatedPercentage = (parseFloat(this.value) / patient.weight * 100).toFixed(1) + '%';
    $('#percentage-' + targetCell).val(calculatedPercentage);
  });

});
