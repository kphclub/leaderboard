// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadMainPageData);

/**
 * Load all data for the main page
 */
async function loadMainPageData() {
  // Get weekly chat data
  const weeklyData = await getWeeklyChatData();
  if (weeklyData) {
    populateWeeklyChatLeaders(weeklyData);
    updateLastUpdatedTime(weeklyData.lastUpdated);
  }

  // Get launches data
  const launchesData = await getLaunchesData();
  if (launchesData) {
    populateProductLaunches(launchesData);
  }
}

/**
 * Populate the weekly chat leaders table
 * @param {Object} data - Weekly chat data
 */
function populateWeeklyChatLeaders(data) {
  const tableBody = document.getElementById('weekly-chat-leaders');
  if (!tableBody) return;

  // Get top 5 users
  const topUsers = data.leaderboard.slice(0, 5);

  if (topUsers.length === 0) {
    tableBody.innerHTML =
      '<tr><td class="py-2 px-4" colspan="3">No data available</td></tr>';
    return;
  }

  // Create HTML for table rows
  const rows = topUsers
    .map((user) => renderLeaderboardRow(user, 'messageCount', 'messages'))
    .join('');

  tableBody.innerHTML = rows;
}

/**
 * Populate the product launches table
 * @param {Object} data - Launches data
 */
function populateProductLaunches(data) {
  const tableBody = document.getElementById('product-launches');
  if (!tableBody) return;

  // Get top 5 users
  const topUsers = data.leaderboard.slice(0, 5);

  if (topUsers.length === 0) {
    tableBody.innerHTML =
      '<tr><td class="py-2 px-4" colspan="3">No data available</td></tr>';
    return;
  }

  // Create HTML for table rows
  const rows = topUsers
    .map((user) => renderLeaderboardRow(user, 'launchCount', 'launches'))
    .join('');

  tableBody.innerHTML = rows;
}
