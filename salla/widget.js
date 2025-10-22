// close
document.getElementById('wa-close').addEventListener("click", (e) => {
    document.getElementById('wa-popup').style.display = 'none';
});

// wa-send
document.getElementById('wa-send').addEventListener("click", (e) => {
    let message = document.getElementById('wa-message').value.trim();
    if(!message) {
        alert('يرجى كتابة رسالة لإرسالها عبر واتساب');
        return;
    }

    var phone = document.getElementById('wa-phone').value;
    var link  = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    window.open(link, '_blank');
    document.getElementById('wa-message').value = '';
    document.getElementById('wa-popup').style.display = 'none';
});