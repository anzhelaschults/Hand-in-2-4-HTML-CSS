<script>
document.getElementById('addNewDay').addEventListener('click', function() {
  document.getElementById('newDayModal').style.display = 'block';
});

document.getElementById('submitNewDay').addEventListener('click', function() {
  const text = document.getElementById('newDayText').value;
  const newPostHtml = `
    <div class="column">
      <h3>New Day</h3>
      <p>${text}</p>
    </div>
  `;
  document.querySelector('.columns').insertAdjacentHTML('beforeend', newPostHtml);
  document.getElementById('newDayModal').style.display = 'none';
  document.getElementById('newDayText').value = '';
});
</script>

document.getElementById('submitNewDay').addEventListener('click', function() {
    const text = document.getElementById('newDayText').value;
    const newPostHtml = `
      <div class="column">
        <h3>New Day</h3>
        <p>${text}</p>
      </div>
    `;
    const columnsContainer = document.querySelector('.columns');
    columnsContainer.insertAdjacentHTML('beforeend', newPostHtml);
    document.getElementById('newDayModal').style.display = 'none';
    document.getElementById('newDayText').value = ''; // Clear the textarea
  
    // Check if the new post is the fourth one in the row
    const allColumns = columnsContainer.querySelectorAll('.column');
    if (allColumns.length % 3 === 1) {
         // If it's the first post in a new row
      allColumns[allColumns.length - 1].style.clear = 'left'; // Clear the floats
    }
  });
  