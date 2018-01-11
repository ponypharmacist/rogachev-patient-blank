// Made by Dmitry Glinskiy, contact me at glinskiy.net
// Primitive range and summ functions
function getSumm(a,b) {
  return a + b;
};

function range(x, min, max) {
  return x >= min && x <= max;
};

function rangeShort(x, min, max) {
  return x >= min && x < max;
};

// Variables
var ageYears = 0;
var ageMonths = 0;
var ageConverted = null;
var genderSelected = null;
var tablePrimaryName = 0;

// Chooses B1-2 table based on age and gender
var primaryTableAgeRange = [
  0,48,52,56,60,64,68,72,76,80,84,88,92,96,102,108,114,120,126,
  132,138,144,150,156,162,168,180,192,204,228,264
];
var primaryTablePrefix = [
  'AgeUnrealisticallyYoung',
  '_40to43', '_44to47', '_48to411', '_50to53', '_54to57', '_58to511', '_60to63', '_64to67', '_68to611',
  '_70to73', '_74to77', '_78to711', '_80to85', '_86to811', '_90to95', '_96to911', '_100to105', '_106to1011',
  '_110to115', '_116to1111', '_120to125', '_126to1211', '_130to135', '_136to1311', '_140to1411',
  '_150to1511', '_160to1611', '_170to1811', '_190to2111'
];
function choosePrimaryTable () {
  let index;
  for (index = 0; index < primaryTableAgeRange.length - 1; index++) {
    if (rangeShort(ageConverted, primaryTableAgeRange[index], primaryTableAgeRange[index + 1])) {
      tablePrimaryName = 'primary_' + genderSelected + primaryTablePrefix[index];
    } else {
    };
  };
  $('.tables-primary').html(tablePrimaryName);
};

// Реагируем на ввод результатов субтеста
function subtestGo(lastSubtest) {
  var lastSubtestResult = $('.sub-res-' + lastSubtest).val();
  var lastSubtestScale = 19 + scanArray(tablePrimaryName, lastSubtest, lastSubtestResult);
  var lastSubtestPercentile = table_percentiles[lastSubtestScale - 19];
  var lastSubtestCategory = getSubtestCategory(lastSubtestScale);
  var lastSubtestSpread = getSubtestSpread(lastSubtest);
  var lastSubtestRange = getSubtestRange(lastSubtestScale, lastSubtestSpread);

  $('.subtest-' + lastSubtest + '-scale').html(lastSubtestScale);
  $('.subtest-' + lastSubtest + '-spread').html(lastSubtestSpread);
  $('.subtest-' + lastSubtest + '-range').html(lastSubtestRange);
  $('.subtest-' + lastSubtest + '-percentile').html(lastSubtestPercentile);
  $('.subtest-' + lastSubtest + '-category').html(lastSubtestCategory);

  $('.last-subtest').html(lastSubtest + ' (' + lastSubtestResult + ')'); // Debug info ToDo: Delete

  renderSubtestGraph();
};

// var lastSubtestScale = scanArray(tablePrimaryName, lastSubtest, lastSubtestResult);
// Array Scanner function
function scanArray (table, subtest, targetScore) {
  var arrayToScan = window[table][subtest];
  var scanResult = 'ошибка';

  for (var i = 0; i < arrayToScan.length; i++) {
    if (typeof(arrayToScan[i]) == 'number') {
      if (arrayToScan[i] == targetScore) {
        scanResult = i;
        break;
      } else {}
    } else if (arrayToScan[i].constructor == Array) {
      if (range(targetScore,arrayToScan[i][0],arrayToScan[i][1])) {
        scanResult = i;
        break;
      } else {}
    } else {}
  }
  return scanResult;
};

// Gets percentile
function getSubtestPercentile(index) {
  console.log('Percentile index is: ' + index);
};

// Gets category name for results
function getSubtestCategory(scaleToPut) {
  var categoryName = 0;

  if (range(scaleToPut,0,30)) {
    categoryName = 'Знач. ниже нормы';
  } else if (range(scaleToPut,31,40)) {
    categoryName = 'Ниже нормы';
  } else if (range(scaleToPut,41,59)) {
    categoryName = 'Норма';
  } else if (range(scaleToPut,60,69)) {
    categoryName = 'Выше нормы';
  } else if (range(scaleToPut,70,99)) {
    categoryName = 'Знач. выше нормы';
  } else {
    categoryName = 'ошибка';
  }

  return categoryName;
};


// Берем данные из таблицы С1
function getSubtestSpread (subtest) {
  var ageGroup;

  if (range(ageYears, 4, 12)) {
    ageGroup = ageYears;
  } else if (range(ageYears, 13, 14)) {
    ageGroup = 13;
  } else if (range(ageYears, 15, 16)) {
    ageGroup = 14;
  } else if (range(ageYears, 17, 21)) {
    ageGroup = 15;
  } else {
    alert('Ошибка в обработке таблицы С1. Нужен дебаг: getSubtestSpread');
  }

  return table_c3[subtest][ageGroup];
};

// Определяем интервал на базе разброса
function getSubtestRange(scale, spread) {
  var lowerRange = parseInt(scale) - parseInt(spread);
  var upperRange = parseInt(scale) + parseInt(spread);
  var resultingRange =  lowerRange + ' - ' + upperRange;
  return resultingRange;
};

//
function setAgeConverted (a,b) {
  ageConverted = ageYears * 12 + ageMonths;
  $('.age-converted').html(ageConverted);
};

// Рендерим графики
function renderSubtestGraph() {
  var percentModifier = 1.4285;
  var graphSubtestScale = parseInt($('.subtest-1-scale').html());
  var graphSubtestSpread = parseInt($('.subtest-1-spread').html());
  var graphWidth = graphSubtestSpread * 2 * percentModifier;
  var graphPosition = (graphSubtestScale - 20 - graphSubtestSpread) * percentModifier;
  $('.graph-subtest-1-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
  $('.graph-subtest-1-value').html(graphSubtestScale + '±' + graphSubtestSpread);
};


$(document).ready(function(){
  // Реагируем на смену возраста
  $('#age-years').on('change', function() {
    ageYears = parseInt(this.value);
    ageMonths = parseInt($('#age-months').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();

    $('#age-years-copy').val(ageYears);
  });

  // Реагируем на смену возраста
  $('#age-months').on('change', function() {
    ageMonths = parseInt(this.value);
    ageYears = parseInt($('#age-years').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();
  });

  // Реагируем на смену пола
  $('#gender').on('change', function() {
    genderSelected = $('#gender').val();
    $('.selected-gender').html(genderSelected);
    ageConverted && genderSelected && choosePrimaryTable();
  });

// Непонятно, как обрабатывать 9 и 9a
  $('#subtest-select').on('change', function() {
    $('.sub-res-1').attr('onchange','subtestGo(' + this.value + ');');

    if (this.value == 1) {
      $('.graph-caption-1').html('A. Отжимания с колен');
    } else {
      $('.graph-caption-1').html('B. Полные отжимания');
    }
  });

// Реагируем на ввод возраста, имени и даты исследования, дублирем их на второй лист
  $('#test-date').on('change', function() {
   $('#test-date-copy').val(this.value);
  });

  $('#patient-name').on('change', function() {
   $('#patient-name-copy').val(this.value);
  });

  $('#doctor-name').on('change', function() {
   $('#doctor-name-copy').val(this.value);
  });

  $('#diagnosisMKB').on('change', function() {
   $('#diagnosisMKB-copy').val(this.value);
  });

  $('#gender').on('change', function() {
   $('#gender-copy').val(this.value);
  });

  $('#patient-id').on('change', function() {
   $('#patient-id-copy').val(this.value);
  });
  $('#category').on('change', function() {
   $('#category-copy').val(this.value);
  });

  // Ставим подписи специалистов
  $('.doctor-select').on('change', function() {
    let selectedDoctor = $(this).val();
    let targetSignature = $(this).attr('id');
    $("#signature-" + targetSignature).attr('class',selectedDoctor);
  });

});
