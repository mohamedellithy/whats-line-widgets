
async function render_whatsapp_icon() {
    if(whatsappln_icon_status == true){
        console.log("WhatsAppLn Widget v1.0.2");
        // Create the <a> element
        const link = document.createElement("a")
        link.href = "#";
        link.target = "";
        link.id = "whatsappIcon";
        link.style.width    = whatsappln_icon_width || "50px";
        link.style.height   = whatsappln_icon_height || "50px";
        link.style.display = "block";

        // Create the <div> element
        const div = document.createElement("div");
        div.className = "whatsapp-button";
        div.title = "تواصل معنا واتساب";
        div.style.position = "fixed";
        div.style.left     = whatsappln_icon_left;
        div.style.right    = whatsappln_icon_right;
        div.style.bottom   = whatsappln_icon_bottom;
        div.style.top      = whatsappln_icon_top;
        div.style.zIndex   = "1000000000000";
        div.style.cursor   = "pointer";

        // Create the <img> element
        const image = document.createElement("img");
        image.className = "whatsapp-image";
        image.src = "https://line.sa/wp-content/uploads/2024/04/whatsapp.png";
        image.alt = "WhatsApp Image";
        image.style.width    = whatsappln_icon_width || "95%";

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
        PhoneHiddenInput.value = whatsappln_custom_merchant_phone || null;
        await div.appendChild(PhoneHiddenInput);
        // Append the <a> element to the document body or any desired parent element
        await document.body.appendChild(div);
        // here call event api
        await link.addEventListener("click", async (e) => {
            document.getElementById('wa-popup').style.display = 'block';
            let apiUrl = "https://whats.line.sa/api/v1/whatsapp-icons/salla/"+whatsappln_store_id;
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
            }).then(async (data) => {
                // Process the response data
                console.log(data);
                if(data?.whatsapp_icon){
                    document.getElementById('wa-popup').innerHTML = data?.whatsapp_icon;
                }

                // close
                let WaCloss = document.getElementById('wa-close');
                await WaCloss.addEventListener("click", (e) => {
                    document.getElementById('wa-popup').style.display = 'none';
                });

                // wa-send
                let WaSend = document.getElementById('wa-send');
                await WaSend.addEventListener("click", (e) => {
                    let message = document.getElementById('wa-message').value.trim();
                    if(!message) {
                        alert('يرجى كتابة رسالة لإرسالها عبر واتساب');
                        return;
                    }

                    var phone = whatsappln_custom_merchant_phone || whatsappln_user_phone;
                    var link  = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
                    window.open(link, '_blank');
                    document.getElementById('wa-message').value = '';
                    document.getElementById('wa-popup').style.display = 'none';
                });
            });
        });

    }
}



/**
 *
 */
async function render_whatsapp_remember_me_on_stock(){
    if(whatsapp_stock_available_status == true){
        let Productlog = sessionStorage.getItem("infiniteScrollState") || [];
        // --- 5. Load saved data ---
        if(Productlog && (typeof Productlog == "string")){
            Productlog = JSON.parse(Productlog);
        }

        console.log(Productlog?.currentPageData[0]?.is_out_of_stock);
        if(Productlog?.currentPageData[0]?.is_out_of_stock == false){
            return;
        }

        let ProductForm = document.querySelector('form.product-form');
        // --- 2. Create container ---
        const WsContainer = document.createElement('div');
        WsContainer.className = 'ws-available-product-container';

        const WsHeading = document.createElement('h2');
        WsHeading.textContent = 'أعلمني عندما يكون المنتج متوفرًا في المخزون';
        WsContainer.appendChild(WsHeading);

        // --- 3. Create form ---
        const Wsform = document.createElement('form');

        // Checkbox to allow WhatsApp
        const WsContainerCheckbox     = document.createElement('div');
        WsContainerCheckbox.className = "ws-container-checkbox";

        // label checkbox
        const whatsappCheckboxLabel   = document.createElement('label');

        // checkbox
        const whatsappCheckbox = document.createElement('input');
        whatsappCheckbox.type = 'checkbox';
        whatsappCheckboxLabel.appendChild(document.createTextNode('أبلغني عبر الواتساب'));
        WsContainerCheckbox.appendChild(whatsappCheckbox);
        WsContainerCheckbox.appendChild(whatsappCheckboxLabel);


        // container whatsapp Section
        const WsContainerSendInputs = document.createElement('div');
        WsContainerSendInputs.className = "ws-container-send-inputs";

        // WhatsApp input field
        const whatsappInput = document.createElement('input');
        whatsappInput.type = 'tel';
        whatsappInput.placeholder = '966000000000';
        whatsappInput.className   = 'whatsapp-field';
        whatsappInput.readOnly    = true;
        whatsappInput.disabled    = true;
        whatsappInput.value       = whatsappln_customer_mobile || null;
        WsContainerSendInputs.appendChild(whatsappInput);

        // Submit button
        const Wsbutton = document.createElement('button');
        Wsbutton.type = 'submit';
        Wsbutton.textContent = 'أعلمني';
        Wsbutton.disabled      = true;
        WsContainerSendInputs.appendChild(Wsbutton);

        // Append elements to Wsform
        Wsform.appendChild(WsContainerCheckbox);
        Wsform.appendChild(WsContainerSendInputs);

        // container all
        WsContainer.appendChild(Wsform);

        // Success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-msg';
        successMsg.textContent = 'سيتم إعلامك عندما يكون المنتج متوفرًا في المخزون!';
        WsContainer.appendChild(successMsg);

        // final
        if(ProductForm){
            ProductForm?.insertAdjacentElement('afterend',WsContainer);
        }

        let product_id                    = document.querySelector('form.product-form > input[name="id"]')?.value;
        let savedWhatsAppProducts         = localStorage.getItem('notifyWhatsAppProducts') || [];

        // --- 4. Show/hide WhatsApp input ---
        whatsappCheckbox.addEventListener('change', async () => {
            Wsbutton.disabled      = whatsappCheckbox.checked ? false : true;
            whatsappInput.disabled = whatsappCheckbox.checked ? false : true;
            whatsappInput.required = whatsappCheckbox.checked;
            if(whatsappCheckbox.checked == false){
                savedWhatsAppProducts.splice(savedWhatsAppProducts.indexOf(product_id),1);
                localStorage.setItem('notifyWhatsAppProducts', JSON.stringify(savedWhatsAppProducts));
                let apiUrl   = "https://whats.line.sa/api/v1/whatsapp-notify-stock-product/delete-salla/"+whatsappln_store_id;
                await fetch(apiUrl, {
                    method: 'POST', // or 'POST', 'PUT', etc.
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_phone: whatsappln_customer_mobile || null,
                        product_id: product_id,
                    }),
                });
                whatsappInput.value = whatsappln_customer_mobile;
                successMsg.style.display = 'none';
            }
        });

        // --- 4. Show/hide WhatsApp input ---
        whatsappInput.addEventListener('blur', () => {
            whatsappInput.value = cleanPhone(whatsappInput.value);
            console.log(whatsappInput.value);
        });

        function cleanPhone(phone) {
            return phone.replace(/[^\d]/g, '');
        }

        // --- 5. Load saved data ---
        if(savedWhatsAppProducts && (typeof savedWhatsAppProducts == "string")){
            savedWhatsAppProducts = JSON.parse(savedWhatsAppProducts);
        }

        if(savedWhatsAppProducts?.indexOf(product_id) != -1) {
            whatsappCheckbox.checked = true;
            whatsappInput.readOnly   = true;
            Wsbutton.disabled      = false;
            successMsg.style.display = 'block';
        }

        // --- 6. Form submit ---
        Wsform.addEventListener('submit',async (e) => {
            e.preventDefault();
            if(whatsappCheckbox.checked){
                Wsbutton.disabled = true;
                if((whatsappln_customer_id != null) && (whatsappln_customer_id != "") && (whatsappln_customer_id != undefined)){
                    whatsappInput.value = whatsappln_customer_mobile;
                    await add_product_on_notify_system(product_id,whatsappln_customer_mobile);
                    if(savedWhatsAppProducts?.indexOf(product_id) == -1){
                        savedWhatsAppProducts.push(product_id);
                        localStorage.setItem('notifyWhatsAppProducts', JSON.stringify(savedWhatsAppProducts));
                    }
                    successMsg.style.display = 'block';
                    Wsbutton.disabled = false;
                } else {
                    let LoginBtn = document.querySelector('.header-btn');
                    console.log(LoginBtn);
                    LoginBtn.click();
                }
            }
        });
    }
}


async function add_product_on_notify_system(product_id,whatsappln_customer_mobile){
    let apiUrl   = "https://whats.line.sa/api/v1/whatsapp-notify-stock-product/salla/"+whatsappln_store_id;
    let response = await fetch(apiUrl, {
        method: 'POST', // or 'POST', 'PUT', etc.
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_phone: whatsappln_customer_mobile || null,
            product_name: document.querySelector('.main-content > h1')?.innerText,
            product_url: window?.location?.href,
            product_id: product_id,
        }),
    });

    // Handle HTTP errors
    if (!response.ok) {
        // Try to read response body for more details
        const errText = await response.json();
        console.log('✅ errText:', errText);
    }

    // Parse JSON
    await response.json();
}




// render_whatsapp_icon
render_whatsapp_icon();
// render_whatsapp_remember_me_on_stock
render_whatsapp_remember_me_on_stock();
