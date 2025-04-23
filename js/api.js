// API Base URL - Change this to your actual API URL when deploying
const API_BASE_URL = 'https://kph-mafia.microcompany.workers.dev';

/**
 * Format date to a human-readable string
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour12: true,
  });
}

/**
 * Fetch data from the API
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Promise with the API data
 */
async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

/**
 * Get main leaderboard data
 * @returns {Promise} - Promise with leaderboard data
 */
async function getLeaderboardData() {
  return fetchFromApi('/api');
}

/**
 * Get launches leaderboard data
 * @returns {Promise} - Promise with launches data
 */
async function getLaunchesData() {
  return fetchFromApi('/api/launches');
}

/**
 * Get chat leaderboard data (both weekly and monthly)
 * @returns {Promise} - Promise with chat data
 */
async function getChatData() {
  return fetchFromApi('/api/chat');
}

/**
 * Get weekly chat leaderboard data
 * @returns {Promise} - Promise with weekly chat data
 */
async function getWeeklyChatData() {
  return fetchFromApi('/api/chat/weekly');
}

/**
 * Get monthly chat leaderboard data
 * @returns {Promise} - Promise with monthly chat data
 */
async function getMonthlyChatData() {
  return fetchFromApi('/api/chat/monthly');
}

/**
 * Format count values for chat leaderboard
 * @param {number} count - The actual count
 * @returns {string} - The formatted count string
 */
function formatChatCount(count) {
  if (count < 5) return '<5';
  if (count < 10) return '5+';
  if (count < 25) return '10+';
  if (count < 50) return '25+';
  if (count < 100) return '50+';
  return '100+';
}

/**
 * Render a row for the leaderboard
 * @param {Object} user - User data
 * @param {string} countField - Name of the count field
 * @param {string} countLabel - Label to display for the count
 * @returns {string} - HTML for the table row
 */
function renderLeaderboardRow(user, countField, countLabel) {
  // Only make the name clickable for the launches list, not for the chat list
  const nameCell =
    countLabel === 'launches'
      ? `<a href="https://launches.kph.club/#${user.name.replace(
          / /g,
          '-'
        )}" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline">${
          user.name
        }</a>`
      : user.name;

  // Format the count based on the leaderboard type
  const countValue =
    countLabel !== 'launches'
      ? formatChatCount(user[countField])
      : user[countField];

  return `
    <tr>
      <td class="py-2 px-2 sm:px-4">${user.rank}</td>
      <td class="py-2 px-2 sm:px-4">${nameCell}</td>
      <td class="py-2 px-2 sm:px-4">${countValue}</td>
    </tr>
  `;
}

/**
 * Display the "last updated" time
 * @param {string} timestamp - ISO timestamp string
 */
function updateLastUpdatedTime(timestamp) {
  const updatedTimeElement = document.getElementById('updated-time');
  if (updatedTimeElement && timestamp) {
    updatedTimeElement.textContent = `Updated: ${formatDate(timestamp)}`;
  }
}
