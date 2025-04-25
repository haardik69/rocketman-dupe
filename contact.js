document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("loaded");
});

function smoothReload() {
    document.body.classList.add("fade-out");
    setTimeout(() => location.reload(), 500);
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");

    submitBtn.classList.add("loading");
    submitText.textContent = "Submitting";
    submitText.classList.add("loading");

    submitText.style.display = "hidden";

    const formData = {
        name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    fetch("https://rocketman-contact-form-536964574187.asia-south1.run.app/send-email", {
    //fetch("http://localhost:8080/send-email", {
    //fetch("http://127.0.0.1:8080/send-email", {
    method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok"); 
        return response.json();
    })
    .then(data => {
        console.log("Server Response:", data);
        submitText.textContent = "Submit";
        submitText.style.display = "inline";
        submitBtn.classList.remove("loading");
        submitText.classList.remove("loading");
        
        if (data.status === "success") {
            showPopup("success");
        } else {
            showPopup("fail");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        submitText.textContent = "Submit";
        submitText.style.display = "inline";
        submitBtn.classList.remove("loading");
        submitText.classList.remove("loading");
        showPopup("fail");
    }) 
    .finally(() => {
        setTimeout(() => {
            submitBtn.classList.remove("loading");
            submitText.textContent = "Submit";
            submitText.classList.remove("loading");
            submitText.style.display = "inline";
        }, 1500);
    });             
});

document.getElementById("retryPopup").addEventListener("click", function() {
    closePopup("fail");
    setTimeout(() => {
        document.getElementById("contact-form").dispatchEvent(new Event("submit"));
    }, 500);
});

document.getElementById("closePopup").addEventListener("click", function() {
    closePopup("success");
    setTimeout(() => location.reload(), 400);
});

document.getElementById("closeFailPopup").addEventListener("click", function() {
    closePopup("fail");
});

function showPopup(type) {
    let popup = type === "success" ? document.getElementById("popupOverlay") : document.getElementById("popupOverlayFail");
    popup.style.display = "flex";
    setTimeout(() => popup.classList.add("show"), 10);
}

function closePopup(type) {
    let popup = type === "success" ? document.getElementById("popupOverlay") : document.getElementById("popupOverlayFail");
    popup.classList.remove("show");
    setTimeout(() => popup.style.display = "none", 400);
}

document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("message");

    textarea.addEventListener("input", function() {
        this.style.height = "auto";
        if (this.scrollHeight <= 200) {
            this.style.height = this.scrollHeight + "px";
        } else {
            this.style.height = "200px";
        }
    });
});