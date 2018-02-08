// Made by Dmitry Glinskiy, contact me at glinskiy.net
// Chooses B1-2 table based on age and gender
var primaryTableAgeRange = [
  0,48,52,56,60,64,68,72,76,80,84,88,92,96,102,108,114,120,126,132,138,144,150,156,162,168,180,192,204,228,264
];
var primaryTablePrefix = [
  'AgeUnrealisticallyYoung',
  '_40to43', '_44to47', '_48to411', '_50to53', '_54to57', '_58to511', '_60to63', '_64to67', '_68to611',
  '_70to73', '_74to77', '_78to711', '_80to85', '_86to811', '_90to95', '_96to911', '_100to105', '_106to1011',
  '_110to115', '_116to1111', '_120to125', '_126to1211', '_130to135', '_136to1311', '_140to1411',
  '_150to1511', '_160to1611', '_170to1811', '_190to2111'
];

// ==================================
// Bot-Short variant main logic
// ==================================
function chooseTable (tablePrefix) {
  let index;
  for (index = 0; index < primaryTableAgeRange.length - 1; index++) {
    if (rangeShort(patient.ageConverted, primaryTableAgeRange[index], primaryTableAgeRange[index + 1])) {
      patient[tablePrefix + 'Table'] = tablePrefix + '_' + patient.gender + primaryTablePrefix[index];
    } else {
    };
  };
  $('#bot-' + tablePrefix + '-table').html(patient[tablePrefix + 'Table']);
};

// Реагируем на ввод результатов субтеста
function subtestBotShortGo(lastSubtest) {
  var lastSubtestResult = $('.sub-res-bs' + lastSubtest).val();
  var lastSubtestScale = 19 + scanArray(patient.botshortTable, lastSubtest, lastSubtestResult);
  var lastSubtestPercentile = table_percentiles[lastSubtestScale - 19];
  var lastSubtestCategory = getBotShortCategory(lastSubtestScale);
  var lastSubtestSpread = table_bs_c3[lastSubtest][selectAgeGroup()];
  var lastSubtestRange = getSubtestRange(lastSubtestScale, lastSubtestSpread);

  $('.subtest-bs' + lastSubtest + '-scale').html(lastSubtestScale);
  $('.subtest-bs' + lastSubtest + '-spread').html(lastSubtestSpread);
  $('.subtest-bs' + lastSubtest + '-range').html(lastSubtestRange);
  $('.subtest-bs' + lastSubtest + '-percentile').html(lastSubtestPercentile);
  $('.subtest-bs' + lastSubtest + '-category').html(lastSubtestCategory);

  $('.last-subtest').html(lastSubtest + ' (' + lastSubtestResult + ')'); // Debug info ToDo: Delete

  renderBotShortGraph();
};

// Gets category name for results
function getBotShortCategory(scaleToPut) {
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


// Рендерим графики
function renderBotShortGraph() {
  var graphSubtestScale = parseInt($('.subtest-bs1-scale').html());
  var graphSubtestSpread = parseInt($('.subtest-bs1-spread').html());
  var graphWidth = graphSubtestSpread * 2 * 1.4285;
  var graphPosition = (graphSubtestScale - 20 - graphSubtestSpread) * 1.4285;
  $('.graph-subtest-bs1-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
  $('.graph-subtest-bs1-value').html(graphSubtestScale + '±' + graphSubtestSpread);
};


// ==================================
// Bot-2 main logic
// ==================================
// Chooses B4-5 table based on age and gender
function chooseSecondaryTable () {
  let result;
  console.log('Started choosing secondary table.');
  if (range(patient.ageConverted, 0, 47)) {
    result = 'AgeUnrealisticallyYoung';
  } else if (range(patient.ageConverted, 48, 59)) {
    result = 'secondary_' + patient.gender + '_40to411';
  } else if (range(patient.ageConverted, 60, 71)) {
    result = 'secondary_' + patient.gender + '_50to511';
  } else if (range(patient.ageConverted, 72, 95)) {
    result = 'secondary_' + patient.gender + '_60to711';
  } else if (range(patient.ageConverted, 96, 119)) {
    result = 'secondary_' + patient.gender + '_80to911';
  } else if (range(patient.ageConverted, 120, 143)) {
    result = 'secondary_' + patient.gender + '_100to1111';
  } else if (range(patient.ageConverted, 144, 179)) {
    result = 'secondary_' + patient.gender + '_120to1411';
  } else if (range(patient.ageConverted, 180, 264)) {
    result = 'secondary_' + patient.gender + '_150to2111';
  } else {
    result = 'AgeUnrealisticallyOld';
  }
  patient.secondaryTable = result;
  console.log('Finished choosing secondary table.');
  $('#bot-table-secondary').html(patient.secondaryTable);
};


// Реагируем на ввод результатов субтеста
function subtestGo(lastSubtest, summaryGroup) {
  var lastSubtestResult = $('.sub-res-' + lastSubtest).val();
  var lastSubtestScale = scanArray(patient.primaryTable, lastSubtest, lastSubtestResult);
  var lastSubtestCategory = getSubtestCategory(lastSubtestScale);
  var lastSubtestSpread = table_c1[lastSubtest][selectAgeGroup()];
  var lastSubtestRange = getSubtestRange(lastSubtestScale, lastSubtestSpread);

  $('.subtest-' + lastSubtest + '-scale').html(lastSubtestScale);
  $('.subtest-' + lastSubtest + '-spread').html(lastSubtestSpread);
  $('.subtest-' + lastSubtest + '-range').html(lastSubtestRange);
  $('.subtest-' + lastSubtest + '-category').html(lastSubtestCategory);

  $('.last-subtest').html(lastSubtest + ' (' + lastSubtestResult + ')'); // Debug info ToDo: Delete

  runSubtestSumm(summaryGroup);
};


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

// Gets category name for results
function getSubtestCategory(scaleToPut) {
  var categoryName = 0;

  if (range(scaleToPut,0,5)) {
    categoryName = 'Знач. ниже нормы';
  } else if (range(scaleToPut,6,10)) {
    categoryName = 'Ниже нормы';
  } else if (range(scaleToPut,11,19)) {
    categoryName = 'Норма';
  } else if (range(scaleToPut,20,24)) {
    categoryName = 'Выше нормы';
  } else if (range(scaleToPut,25,35)) {
    categoryName = 'Знач. выше нормы';
  } else {
    categoryName = 'ошибка';
  }

  return categoryName;
};

// Выбор возрастной категории для таблиц С1 и C3 (spread)
function selectAgeGroup() {
  var ageGroup;
  if (range(patient.ageYears, 4, 12)) {
    ageGroup = patient.ageYears;
  } else if (range(patient.ageYears, 13, 14)) {
    ageGroup = 13;
  } else if (range(patient.ageYears, 15, 16)) {
    ageGroup = 14;
  } else if (range(patient.ageYears, 17, 21)) {
    ageGroup = 15;
  } else {
    alert('Ошибка в обработке таблицы С1.');
  }
  return ageGroup;
}

// Определяем интервал на базе разброса
function getSubtestRange(scale, spread) {
  var lowerRange = parseInt(scale) - parseInt(spread);
  var upperRange = parseInt(scale) + parseInt(spread);
  var resultingRange =  lowerRange + ' - ' + upperRange;
  return resultingRange;
};


//
function getSummaryCategory(scaleToPut) {
  var categoryName = 0;

  if (range(scaleToPut,0,30)) {
    categoryName = 'Знач. ниже нормы';
  } else if (range(scaleToPut,31,40)) {
    categoryName = 'Ниже нормы';
  } else if (range(scaleToPut,41,59)) {
    categoryName = 'Норма';
  } else if (range(scaleToPut,60,69)) {
    categoryName = 'Выше нормы';
  } else if (range(scaleToPut,70,100)) {
    categoryName = 'Знач. выше нормы';
  } else {
    categoryName = 'ошибка';
  }

  return categoryName;
};

// Проверяет, готовы ли данные для суммирования, если да, запускает обновление строки саммари
function runSubtestSumm (summary) {
  var subtestsToSum = getSubtestsForSummary(summary);
  var firstSubtest = subtestsToSum[0];
  var secondSubtest = subtestsToSum[1];

  var subtestVal1 = parseInt($('.subtest-' + firstSubtest + '-scale').html());
  var subtestVal2 = parseInt($('.subtest-' + secondSubtest + '-scale').html());

  var subtestSum;

  if (subtestVal1 && subtestVal2) {
    subtestSum = getSumm(subtestVal1, subtestVal2);
    updateSubtestSum(summary, subtestSum);
  } else {
  }
};

// Узнаем, какие субтесты входят в саммари
function getSubtestsForSummary(summary) {
  var subtestsForSummary = 0;
  if (summary == 1) {
    subtestsForSummary = [1,2];
  } else if (summary == 2) {
    subtestsForSummary = [3,7];
  } else if (summary == 3) {
    subtestsForSummary = [4,5];
  } else if (summary == 4) {
    subtestsForSummary = [6,8];
  } else if (summary == 5) {
    subtestsForSummary = [6,9];
  } else {
    alert('Неправильно передается номер саммари');
  }

  return subtestsForSummary;
};


// Обновляет данные в строчке саммари
function updateSubtestSum(summaryNo, summarySum) {
  var summaryScaleIndex = parseInt(scanArray(patient.secondaryTable, summaryNo, summarySum));
  var summaryScale = window[patient.secondaryTable][6][summaryScaleIndex];
  var summaryPercentile = window[patient.secondaryTable][7][summaryScaleIndex];
  var summaryCategory = getSummaryCategory(summaryScale);

  var summarySpread = table_c3[summaryNo][selectAgeGroup()];

  var summaryRange = getSubtestRange(summaryScale, summarySpread);

  $('.summary-' + summaryNo + '-summ').html(summarySum);
  $('.summary-' + summaryNo + '-scale').html(summaryScale);
  $('.summary-' + summaryNo + '-spread').html(summarySpread);
  $('.summary-' + summaryNo + '-range').html(summaryRange);
  $('.summary-' + summaryNo + '-percentile').html(summaryPercentile);
  $('.summary-' + summaryNo + '-category').html(summaryCategory);

  checkSumsReady() && updateTotals();
};


// Проверяем, готовы ли все 4 суммы для финального суммирования
function checkSumsReady () {
  var sumOne = parseInt($('.summary-1-summ').html());
  var sumTwo = parseInt($('.summary-2-summ').html());
  var sumTre = parseInt($('.summary-3-summ').html());
  var sumQua = parseInt($('.summary-4-summ').html());

  if (sumOne && sumTwo && sumTre && sumQua) {
    return true;
  } else {
    return false;
  }
};

// Update grand totals, yes!
function updateTotals () {
  console.log('Started updating totals.');
  var table_total_scale = 'table_total_scale';
  var totalScore = parseInt($('.summary-1-scale').html()) + parseInt($('.summary-2-scale').html()) + parseInt($('.summary-3-scale').html()) + parseInt($('.summary-4-scale').html());

  var totalAgeGroup = getTotalAgeGroup(); // returns 1, 2, 3 or 4
  var totalScaleIndex = parseInt(scanArray(table_total_scale, totalAgeGroup, totalScore));
  var totalScale = window[table_total_scale][5][totalScaleIndex];
  var totalPercentile = window[table_total_scale][6][totalScaleIndex];
  var totalSpread = table_c3[6][selectAgeGroup()];
  var totalRange = getSubtestRange(totalScale, totalSpread);
  var totalCategory = getSummaryCategory(totalScale);

  $('.total-score').html(totalScore);
  $('.total-scale').html(totalScale);
  $('.total-spread').html(totalSpread);
  $('.total-range').html(totalRange);
  $('.total-percentile').html(totalPercentile);
  $('.total-category').html(totalCategory);

  renderGraphs();
};


// Возрастной диапазон из таблицы B7
function getTotalAgeGroup (subtest) {
  if (patient.gender == 'female' && range(patient.ageYears, 4, 9)) {
    return 1;
  } else if (patient.gender == 'female' && range(patient.ageYears, 10, 21)) {
    return 2;
  } else if (patient.gender == 'male' && range(patient.ageYears, 4, 9)) {
    return 3;
  } else if (patient.gender == 'male' && range(patient.ageYears, 10, 21)) {
    return 4;
  } else {
    alert('Ошибка в getTotalAgeGroup');
  }
};


// Рендерим графики
function renderGraphs() {
  renderTotalGraphs();
  renderSummaryGraphs();
  renderSubtestGraphs();
};

function renderTotalGraphs() {
    var percentModifier = 1.4285;
    var graphTotalScale = parseInt($('.total-scale').html());
    var graphTotalSpread = parseInt($('.total-spread').html());
    var graphWidth = graphTotalSpread * 2 * percentModifier;
    var graphPosition = (graphTotalScale - 20 - graphTotalSpread) * percentModifier;

    $('.graph-total-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-total-value').html(graphTotalScale + '±' + graphTotalSpread);
};

function renderSummaryGraphs() {
  for (var i = 1; i < 5; i++) {
    var percentModifier = 1.4285;
    var graphSummaryScale = readSummaryScale(i);
    var graphSummarySpread = readSummarySpread(i);
    var graphWidth = graphSummarySpread * 2 * percentModifier;
    var graphPosition = (graphSummaryScale - 20 - graphSummarySpread) * percentModifier;

    $('.graph-summary-' + i + '-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-summary-' + i + '-value').html(graphSummaryScale + '±' + graphSummarySpread);
  }
};

function renderSubtestGraphs() {
  for (var i = 1; i < 9; i++) {
    var percentModifier = 1.4285;
    var graphSubtestScale = readSubtestScale(i);
    var graphSubtestSpread = readSubtestSpread(i);
    var graphWidth = graphSubtestSpread * 4 * percentModifier;
    var graphPosition = (graphSubtestScale - graphSubtestSpread) * 2 * percentModifier;

    $('.graph-subtest-' + i + '-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-subtest-' + i + '-value').html(graphSubtestScale + '±' + graphSubtestSpread);
  }
};

function readSubtestScale(subtestNumber) {
  return parseInt($('.subtest-' + subtestNumber + '-scale').html());
};

function readSubtestSpread(subtestNumber) {
  return parseInt($('.subtest-' + subtestNumber + '-spread').html());
};

function readSummaryScale(summaryNumber) {
  return parseInt($('.summary-' + summaryNumber + '-scale').html());
};

function readSummarySpread(summaryNumber) {
  return parseInt($('.summary-' + summaryNumber + '-spread').html());
};


$(document).ready(function(){
// Выбор подтипа отжиманий
  $('#subtest-8-select').on('change', function() {
    var selVal = parseInt(this.value) - 4;
    var selStr = 'subtestGo(' + this.value + ',' + selVal + ');'
    console.log(selStr);
    $('.sub-res-8').attr('onchange',selStr);
    if (this.value == 9) {
      $('.graph-caption-8').html('8b. Полные отжимания');
    } else {
      $('.graph-caption-8').html('8a. Отжимания с колен');
    }
  });

// Выбор подтипа отжиманий BotShort
  $('#subtest-bs-select').on('change', function() {
    $('.sub-res-bs1').attr('onchange','subtestBotShortGo(' + this.value + ');');
    if (this.value == 1) {
      $('.graph-caption-bs1').html('A. Отжимания с колен');
    } else {
      $('.graph-caption-bs1').html('B. Полные отжимания');
    }
  });

});
