function copyUPI() {
    const upiText = document.getElementById("upiId").innerText;

    navigator.clipboard.writeText(upiText).then(() => {
        alert("UPI ID copied to clipboard");
    });
}

function joinTelegram() {
    window.open("https://t.me/bhagvad_gita_daily", "_blank");
}

