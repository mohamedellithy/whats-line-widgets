
async function render_whatsapp() {
    if("{{app.wahtsapp_icon_status}}" == true){
        console.log("WhatsAppLn Widget v1.0.0");
        // Create the <a> element
        const link = document.createElement("a")
        link.href = "#";
        link.target = "";
        link.id = "whatsappIcon";
        link.style.width    = "{{app.whatsapp_icon_width}}" || "50px";
        link.style.height   = "{{app.whatsapp_icon_height}}" || "50px";
        link.style.display = "block";
    
        // Create the <div> element
        const div = document.createElement("div");
        div.className = "whatsapp-button";
        div.title = "تواصل معنا واتساب";
        div.style.position = "fixed";
        div.style.left     = "{{app.whatsapp_icon_left}}";
        div.style.right    = "{{app.whatsapp_icon_right}}";
        div.style.bottom   = "{{app.whatsapp_icon_bottom}}";
        div.style.top      = "{{app.whatsapp_icon_top}}";
        div.style.zIndex   = "1000000000000";
        div.style.cursor   = "pointer";
    
        // Create the <img> element
        const image = document.createElement("img");
        image.className = "whatsapp-image";
        image.src = "https://line.sa/wp-content/uploads/2024/04/whatsapp.png";
        image.alt = "WhatsApp Image";
        image.style.width    = "{{app.whatsapp_icon_width}}" || "95%";
    
        // Append the <img> element to the <div> element
        link.appendChild(image);
        
        // create contriner widget
        const ContainerWidget               = document.createElement('div');
        ContainerWidget.id                  = "wa-popup";
        ContainerWidget.style.display       = "none";
        ContainerWidget.style.width         = "320px";
        ContainerWidget.style.backgroundColor = "#fff";
        ContainerWidget.style.borderRadius  = "16px";
        ContainerWidget.style.boxShadow     = "0 4px 24px rgba(0,0,0,0.16)";
        ContainerWidget.style.border        = "1px solid #e0e0e0";
        ContainerWidget.style.zIndex        = "10000";
        ContainerWidget.style.padding       = "20px 16px 12px 16px";
        await div.appendChild(ContainerWidget);
        // Append the <div> element to the <a> element
        await div.appendChild(link);
    
        // phone
        const PhoneHiddenInput = document.createElement('input');
        PhoneHiddenInput.type  = "hidden";
        PhoneHiddenInput.id    = "wa-phone";
        PhoneHiddenInput.value = "{{app.custom_merchant_phone}}";
        await div.appendChild(PhoneHiddenInput);
        // Append the <a> element to the document body or any desired parent element
        await document.body.appendChild(div);
        // here call event api
        await link.addEventListener("click", async (e) => {
            document.getElementById('wa-popup').style.display = 'block';
            let apiUrl = "https://whats.line.sa/api/v1/whatsapp-icons/salla/{{store.id}}";
            await fetch(apiUrl, {
                method: 'GET', // or 'POST', 'PUT', etc.
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Request failed with status code ' + response.status);
                }
                return response.json(); // or response.text() for non-JSON responses
            }).then(data => {
                // Process the response data
                console.log(data);
                if(data?.whatsapp_icon){
                    document.getElementById('wa-popup').innerHTML = data?.whatsapp_icon;
                }
            });
        });
    }
}

//
// here
render_whatsapp();
// here 

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