document.getElementById('saveBtn').addEventListener('click', () => {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('document', content);
    alert('Document saved!');
});

document.getElementById('loadBtn').addEventListener('click', () => {
    const content = localStorage.getItem('document');
    if (content) {
        document.getElementById('editor').innerHTML = content;
    } else {
        alert('No document found!');
    }
});
document.getElementById('shareBtn').addEventListener('click', () => {
    console.alert("Coming Soon!");
});