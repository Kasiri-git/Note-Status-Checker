document.addEventListener('DOMContentLoaded', function() {
  // ポップアップのDOM要素を取得
  var weeklyPVElement = document.getElementById('weekly-pv');
  var weeklyLikesElement = document.getElementById('weekly-likes');
  var weeklyCommentsElement = document.getElementById('weekly-comments');
  var monthlyPVElement = document.getElementById('monthly-pv');
  var monthlyLikesElement = document.getElementById('monthly-likes');
  var monthlyCommentsElement = document.getElementById('monthly-comments');
  var yearlyPVElement = document.getElementById('yearly-pv');
  var yearlyLikesElement = document.getElementById('yearly-likes');
  var yearlyCommentsElement = document.getElementById('yearly-comments');
  var allPVElement = document.getElementById('all-pv');
  var allLikesElement = document.getElementById('all-likes');
  var allCommentsElement = document.getElementById('all-comments');

  // 各APIからデータを取得する関数
  function fetchData(url, label) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const total_pvRegex = /"total_pv":(\d+)/;
        const total_likeRegex = /"total_like":(\d+)/;
        const total_commentRegex = /"total_comment":(\d+)/;
        const total_pvMatch = data.match(total_pvRegex);
        const total_likeMatch = data.match(total_likeRegex);
        const total_commentMatch = data.match(total_commentRegex);

        var totalPV = 'Failed to extract total PV';
        var totalLikes = 'Failed to extract total likes';
        var totalComments = 'Failed to extract total comments';

        if (total_pvMatch && total_pvMatch[1]) {
          totalPV = total_pvMatch[1];
        }

        if (total_likeMatch && total_likeMatch[1]) {
          totalLikes = total_likeMatch[1];
        }

        if (total_commentMatch && total_commentMatch[1]) {
          totalComments = total_commentMatch[1];
        }

        // データを表示する
        if (label === 'Weekly') {
          weeklyPVElement.textContent = totalPV;
          weeklyLikesElement.textContent = totalLikes;
          weeklyCommentsElement.textContent = totalComments;
        } else if (label === 'Monthly') {
          monthlyPVElement.textContent = totalPV;
          monthlyLikesElement.textContent = totalLikes;
          monthlyCommentsElement.textContent = totalComments;
        } else if (label === 'Yearly') {
          yearlyPVElement.textContent = totalPV;
          yearlyLikesElement.textContent = totalLikes;
          yearlyCommentsElement.textContent = totalComments;
        } else if (label === 'All Time') {
          allPVElement.textContent = totalPV;
          allLikesElement.textContent = totalLikes;
          allCommentsElement.textContent = totalComments;
        }
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }

   // データを取得して表示する
  fetchData('https://note.com/api/v1/stats/pv?filter=weekly&page=1&sort=pv', 'Weekly');
  fetchData('https://note.com/api/v1/stats/pv?filter=monthly&page=1&sort=pv', 'Monthly');
  fetchData('https://note.com/api/v1/stats/pv?filter=yearly&page=1&sort=pv', 'Yearly');
  fetchData('https://note.com/api/v1/stats/pv?filter=all&page=1&sort=pv', 'All Time');
});
