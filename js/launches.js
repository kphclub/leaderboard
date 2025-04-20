// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadLaunchesData);

/**
 * Load product launches data
 */
async function loadLaunchesData() {
  const data = await getLaunchesData();
  if (data) {
    populateProductLaunches(data);
    updateLastUpdatedTime(data.lastUpdated);
  }
}

/**
 * Populate the product launches table
 * @param {Object} data - Launches data
 */
function populateProductLaunches(data) {
  const tableBody = document.getElementById('product-launches');
  if (!tableBody) return;

  if (data.leaderboard.length === 0) {
    tableBody.innerHTML =
      '<tr><td class="py-2 px-4" colspan="3">No data available</td></tr>';
    return;
  }

  // Create HTML for table rows
  const rows = data.leaderboard
    .map((user) => renderLeaderboardRow(user, 'launchCount', 'launches'))
    .join('');

  tableBody.innerHTML = rows;
}
