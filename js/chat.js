// Store the data globally to avoid refetching when switching tabs
let chatData = null;

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadChatData);

/**
 * Load chat leaderboard data
 */
async function loadChatData() {
  // Fetch combined chat data
  chatData = await getChatData();

  if (chatData) {
    // Populate weekly data by default
    populateWeeklyChatData(chatData.weekly);
    updateLastUpdatedTime(chatData.weekly.lastUpdated);

    // Also preload monthly data in the background
    populateMonthlyChatData(chatData.monthly);

    // Check if URL has a hash for monthly view
    if (window.location.hash === '#monthly') {
      showMonthly();
    }
  }
}

/**
 * Populate the weekly chat data table
 * @param {Object} data - Weekly chat data
 */
function populateWeeklyChatData(data) {
  const tableBody = document.getElementById('weekly-data');
  if (!tableBody) return;

  if (data.leaderboard.length === 0) {
    tableBody.innerHTML =
      '<tr><td class="py-2 px-4" colspan="3">No weekly data available</td></tr>';
    return;
  }

  // Create HTML for table rows
  const rows = data.leaderboard
    .map((user) => renderLeaderboardRow(user, 'messageCount', 'messages'))
    .join('');

  tableBody.innerHTML = rows;
}

/**
 * Populate the monthly chat data table
 * @param {Object} data - Monthly chat data
 */
function populateMonthlyChatData(data) {
  const tableBody = document.getElementById('monthly-data');
  if (!tableBody) return;

  if (data.leaderboard.length === 0) {
    tableBody.innerHTML =
      '<tr><td class="py-2 px-4" colspan="3">No monthly data available</td></tr>';
    return;
  }

  // Create HTML for table rows
  const rows = data.leaderboard
    .map((user) => renderLeaderboardRow(user, 'messageCount', 'messages'))
    .join('');

  tableBody.innerHTML = rows;
}

/**
 * Show weekly data tab
 */
function showWeekly() {
  document.getElementById('weekly-data').classList.remove('hidden');
  document.getElementById('monthly-data').classList.add('hidden');
  document.getElementById('leaderboard-title').textContent =
    'Weekly Active Members';

  // Update buttons
  document.getElementById('weekly-btn').className =
    'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-l-md hover:bg-indigo-700 focus:z-10 focus:outline-none';
  document.getElementById('monthly-btn').className =
    'px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-r-md hover:bg-gray-200 focus:z-10 focus:outline-none';

  // Update URL hash
  window.location.hash = 'weekly';

  // Update last updated time
  if (chatData && chatData.weekly) {
    updateLastUpdatedTime(chatData.weekly.lastUpdated);
  }
}

/**
 * Show monthly data tab
 */
function showMonthly() {
  document.getElementById('monthly-data').classList.remove('hidden');
  document.getElementById('weekly-data').classList.add('hidden');
  document.getElementById('leaderboard-title').textContent =
    'Monthly Active Members';

  // Update buttons
  document.getElementById('monthly-btn').className =
    'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700 focus:z-10 focus:outline-none';
  document.getElementById('weekly-btn').className =
    'px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-l-md hover:bg-gray-200 focus:z-10 focus:outline-none';

  // Update URL hash
  window.location.hash = 'monthly';

  // Update last updated time
  if (chatData && chatData.monthly) {
    updateLastUpdatedTime(chatData.monthly.lastUpdated);
  }
}
