console.log("WhatsAppLn Widget v1.0.58");

/**
 * Clean phone number helper
 */
function cleanPhone(phone) {
    if (!phone) return '';
    return String(phone).replace(/[^\d]/g, '');
}

/**
 * Check if a status flag is truthy (true, !0, 1, '1', 'true')
 */
function isWidgetActive(val) {
    if (typeof val === 'undefined' || val === null) return false;
    return val === true || val === !0 || val === 1 || val === '1' || val === 'true';
}

/**
 * Render WhatsApp Floating Icon
 */
async function render_whatsapp_icon() {
    var status = (typeof whatsappln_icon_status !== 'undefined') ? whatsappln_icon_status : ((typeof window !== 'undefined' && typeof window.whatsappln_icon_status !== 'undefined') ? window.whatsappln_icon_status : null);
    if (!isWidgetActive(status)) {
        return;
    }

    if (document.getElementById('whatsappIcon') || document.getElementById('wa-popup')) {
        return;
    }

    if (!document.body) {
        document.addEventListener('DOMContentLoaded', render_whatsapp_icon);
        return;
    }

    const link = document.createElement("a");
    link.href = "#";
    link.target = "";
    link.id = "whatsappIcon";
    link.style.width = (typeof whatsappln_icon_width !== 'undefined' && whatsappln_icon_width) ? whatsappln_icon_width : "50px";
    link.style.height = (typeof whatsappln_icon_height !== 'undefined' && whatsappln_icon_height) ? whatsappln_icon_height : "50px";
    link.style.display = "block";

    const div = document.createElement("div");
    div.className = "wa-button_***";
    div.title = "تواصل معنا واتساب";
    div.style.position = "fixed";
    div.style.left = (typeof whatsappln_icon_left !== 'undefined') ? whatsappln_icon_left : "";
    div.style.right = (typeof whatsappln_icon_right !== 'undefined') ? whatsappln_icon_right : "20px";
    div.style.bottom = (typeof whatsappln_icon_bottom !== 'undefined') ? whatsappln_icon_bottom : "20px";
    div.style.top = (typeof whatsappln_icon_top !== 'undefined') ? whatsappln_icon_top : "";
    div.style.zIndex = "1000000000000";
    div.style.cursor = "pointer";

    const image = document.createElement("img");
    image.className = "whatsapp-image";
    image.src = "https://line.sa/wp-content/uploads/2025/12/whatsapp.png";
    image.alt = "WhatsApp Image";
    image.style.width = (typeof whatsappln_icon_width !== 'undefined' && whatsappln_icon_width) ? whatsappln_icon_width : "95%";
    link.appendChild(image);

    const ContainerWidget = document.createElement('div');
    ContainerWidget.id = "wa-popup";
    ContainerWidget.style.display = "none";
    ContainerWidget.style.width = "320px";
    ContainerWidget.style.maxWidth = "90vw";
    ContainerWidget.style.backgroundColor = "#fff";
    ContainerWidget.style.borderRadius = "16px";
    ContainerWidget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.16)";
    ContainerWidget.style.border = "1px solid #e0e0e0";
    ContainerWidget.style.zIndex = "10000";
    ContainerWidget.style.padding = "20px 16px 12px 16px";

    div.appendChild(ContainerWidget);
    div.appendChild(link);

    const PhoneHiddenInput = document.createElement('input');
    PhoneHiddenInput.type = "hidden";
    PhoneHiddenInput.id = "wa-phone";
    PhoneHiddenInput.value = (typeof whatsappln_custom_merchant_phone !== 'undefined') ? whatsappln_custom_merchant_phone : null;
    div.appendChild(PhoneHiddenInput);

    document.body.appendChild(div);

    var isPopupLoaded = false;
    link.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        var popup = document.getElementById('wa-popup');
        if (!popup) return;

        if (popup.style.display === 'block') {
            popup.style.display = 'none';
            return;
        }

        if (isPopupLoaded) {
            popup.style.display = 'block';
            return;
        }

        popup.style.display = 'block';
        var storeId = (typeof whatsappln_store_id !== 'undefined') ? whatsappln_store_id : '';
        var apiUrl = "https://whats.line.sa/api/v1/whatsapp-icons/salla/" + storeId;

        try {
            var response = await fetch(apiUrl, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Request failed with status code ' + response.status);
            }

            var data = await response.json();
            if (data && data.whatsapp_icon) {
                popup.innerHTML = data.whatsapp_icon;
                isPopupLoaded = true;

                var WaCloss = document.getElementById('wa-close');
                if (WaCloss) {
                    WaCloss.addEventListener("click", (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        popup.style.display = 'none';
                    });
                }

                var WaSend = document.getElementById('wa-send');
                if (WaSend) {
                    WaSend.addEventListener("click", (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var msgInput = document.getElementById('wa-message');
                        var message = msgInput ? msgInput.value.trim() : '';
                        if (!message) {
                            alert('يرجى كتابة رسالة لإرسالها عبر واتساب');
                            return;
                        }

                        var phone = (typeof whatsappln_custom_merchant_phone !== 'undefined' && whatsappln_custom_merchant_phone)
                            ? whatsappln_custom_merchant_phone
                            : ((typeof whatsappln_user_phone !== 'undefined') ? whatsappln_user_phone : '');

                        var link = 'https://wa.me/' + cleanPhone(phone) + '?text=' + encodeURIComponent(message);
                        window.open(link, '_blank');
                        if (msgInput) msgInput.value = '';
                        popup.style.display = 'none';
                    });
                }
            }
        } catch (err) {
            console.error('WhatsAppLn: popup load error', err);
        }
    });
}

/**
 * Render "Notify Me On Stock" Form
 */
async function render_whatsapp_remember_me_on_stock() {
    var stockStatus = (typeof whatsapp_stock_available_status !== 'undefined') ? whatsapp_stock_available_status : ((typeof window !== 'undefined' && typeof window.whatsapp_stock_available_status !== 'undefined') ? window.whatsapp_stock_available_status : null);
    if (!isWidgetActive(stockStatus)) {
        return;
    }

    var ProductTag = document.querySelector('meta[property="product:availability"]');
    if (ProductTag) {
        var Product_available = (ProductTag.getAttribute('content') || '').toLowerCase().trim();
        if (Product_available === "in stock" || Product_available === "instock") {
            return;
        }
    }

    var ProductForm = document.querySelector('form.product-form') || document.querySelector('.product-form') || document.querySelector('salla-product-options') || document.querySelector('#product-form');
    if (!ProductForm) {
        return;
    }

    if (document.querySelector('.ws-available-product-container')) {
        return;
    }

    const WsContainer = document.createElement('div');
    WsContainer.className = 'ws-available-product-container';

    const WsHeading = document.createElement('h2');
    WsHeading.textContent = 'أعلمني عندما يكون المنتج متوفرًا في المخزون';
    WsContainer.appendChild(WsHeading);

    // CRITICAL: Must be a DIV, NOT A FORM, to prevent any page refresh in all themes
    const Wsform = document.createElement('div');
    Wsform.className = 'ws-notify-form';

    const WsContainerCheckbox = document.createElement('div');
    WsContainerCheckbox.className = "ws-container-checkbox";

    const whatsappCheckboxLabel = document.createElement('label');
    const whatsappCheckbox = document.createElement('input');
    whatsappCheckbox.type = 'checkbox';
    whatsappCheckbox.id = 'ws-whatsapp-checkbox';
    whatsappCheckboxLabel.htmlFor = 'ws-whatsapp-checkbox';
    whatsappCheckboxLabel.appendChild(document.createTextNode('أبلغني عبر الواتساب'));
    WsContainerCheckbox.appendChild(whatsappCheckbox);
    WsContainerCheckbox.appendChild(whatsappCheckboxLabel);

    const WsContainerSendInputs = document.createElement('div');
    WsContainerSendInputs.className = "ws-container-send-inputs";

    const whatsappInput = document.createElement('input');
    whatsappInput.type = 'tel';
    whatsappInput.placeholder = '966000000000';
    whatsappInput.className = 'whatsapp-field';
    whatsappInput.readOnly = true;
    whatsappInput.disabled = true;
    var custMobile = (typeof whatsappln_customer_mobile !== 'undefined') ? whatsappln_customer_mobile : '';
    whatsappInput.value = cleanPhone(custMobile);
    WsContainerSendInputs.appendChild(whatsappInput);

    // CRITICAL: type="button" strictly prevents submitting any outer form
    const Wsbutton = document.createElement('button');
    Wsbutton.type = 'button';
    Wsbutton.textContent = 'أعلمني';
    Wsbutton.disabled = true;
    Wsbutton.className = 'ws-submit-btn';
    Wsbutton.style.backgroundColor = '#278d46';
    Wsbutton.style.color = '#fff';
    Wsbutton.style.border = 'none';
    Wsbutton.style.padding = '6px 18px';
    Wsbutton.style.fontSize = '13px';
    Wsbutton.style.borderRadius = '12px';
    Wsbutton.style.cursor = 'pointer';
    WsContainerSendInputs.appendChild(Wsbutton);

    Wsform.appendChild(WsContainerCheckbox);
    Wsform.appendChild(WsContainerSendInputs);
    WsContainer.appendChild(Wsform);

    const successMsg = document.createElement('div');
    successMsg.className = 'success-msg';
    successMsg.textContent = 'سيتم إعلامك عندما يكون المنتج متوفرًا في المخزون!';
    successMsg.style.display = 'none';
    WsContainer.appendChild(successMsg);

    ProductForm.insertAdjacentElement('afterend', WsContainer);

    var product_id = document.querySelector('form.product-form input[name="id"], input[name="product_id"]')?.value
        || (window.salla && window.salla.config && typeof window.salla.config.get === 'function' ? window.salla.config.get('page.id') : null);

    var savedWhatsAppProducts = [];
    try {
        var rawStored = localStorage.getItem('notifyWhatsAppProducts');
        if (rawStored) {
            savedWhatsAppProducts = JSON.parse(rawStored);
            if (!Array.isArray(savedWhatsAppProducts)) savedWhatsAppProducts = [];
        }
    } catch (e) {
        savedWhatsAppProducts = [];
    }

    if (product_id && savedWhatsAppProducts.indexOf(product_id) !== -1) {
        whatsappCheckbox.checked = true;
        whatsappInput.readOnly = true;
        whatsappInput.disabled = false;
        Wsbutton.disabled = false;
        successMsg.style.display = 'block';
    }

    function checkIsLoggedIn() {
        var custId = (typeof whatsappln_customer_id !== 'undefined') ? whatsappln_customer_id : ((typeof window !== 'undefined' && typeof window.whatsappln_customer_id !== 'undefined') ? window.whatsappln_customer_id : null);
        if (custId === null || custId === undefined) return false;
        var s = String(custId).trim();
        return s !== '' && s !== 'null' && s !== 'undefined' && s !== '0';
    }

    function openLoginSafely() {
        try {
            if (window.salla && window.salla.event && typeof window.salla.event.dispatch === 'function') {
                window.salla.event.dispatch('login::open');
                return;
            }
        } catch (e) { }

        try {
            if (window.salla && window.salla.auth && typeof window.salla.auth.openLogin === 'function') {
                window.salla.auth.openLogin();
                return;
            }
        } catch (e) { }

        const modalTrigger = document.querySelector('salla-login, [salla-login], button[data-show-modal="login"]');
        if (modalTrigger && typeof modalTrigger.click === 'function') {
            modalTrigger.click();
            return;
        }

        alert('يرجى تسجيل الدخول إلى حسابك في المتجر أولاً لتفعيل تنبيه توفر المنتج.');
    }

    whatsappCheckbox.addEventListener('change', async () => {
        Wsbutton.disabled = !whatsappCheckbox.checked;
        whatsappInput.disabled = !whatsappCheckbox.checked;
        whatsappInput.required = whatsappCheckbox.checked;

        if (!whatsappCheckbox.checked) {
            if (product_id) {
                var pIdx = savedWhatsAppProducts.indexOf(product_id);
                if (pIdx !== -1) {
                    savedWhatsAppProducts.splice(pIdx, 1);
                    try {
                        localStorage.setItem('notifyWhatsAppProducts', JSON.stringify(savedWhatsAppProducts));
                    } catch (e) { }
                }

                var storeId = (typeof whatsappln_store_id !== 'undefined') ? whatsappln_store_id : '';
                if (storeId) {
                    var apiUrl = "https://whats.line.sa/api/v1/whatsapp-notify-stock-product/delete-salla/" + storeId;
                    await fetch(apiUrl, {
                        method: 'POST',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            client_phone: cleanPhone(whatsappInput.value) || cleanPhone(typeof whatsappln_customer_mobile !== 'undefined' ? whatsappln_customer_mobile : ''),
                            product_id: product_id,
                        }),
                    }).catch(() => { });
                }
            }

            var mobile = (typeof whatsappln_customer_mobile !== 'undefined') ? whatsappln_customer_mobile : '';
            whatsappInput.value = cleanPhone(mobile);
            successMsg.style.display = 'none';
        } else {
            if (!checkIsLoggedIn()) {
                openLoginSafely();
            } else {
                var m = (typeof whatsappln_customer_mobile !== 'undefined') ? whatsappln_customer_mobile : '';
                whatsappInput.value = cleanPhone(m);
            }
        }
    });

    whatsappInput.addEventListener('blur', () => {
        whatsappInput.value = cleanPhone(whatsappInput.value);
    });

    async function submitStockNotify(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }

        if (!whatsappCheckbox.checked) return;

        if (!checkIsLoggedIn()) {
            openLoginSafely();
            return;
        }

        var clientMobile = cleanPhone(whatsappInput.value) || cleanPhone(typeof whatsappln_customer_mobile !== 'undefined' ? whatsappln_customer_mobile : '');
        if (!clientMobile) {
            alert('يرجى التأكد من كتابة رقم الهاتف.');
            return;
        }

        Wsbutton.disabled = true;
        var originalText = Wsbutton.textContent;
        Wsbutton.textContent = 'جاري الحفظ...';

        try {
            var ok = await add_product_on_notify_system(product_id, clientMobile);
            if (ok) {
                if (product_id && savedWhatsAppProducts.indexOf(product_id) === -1) {
                    savedWhatsAppProducts.push(product_id);
                    try {
                        localStorage.setItem('notifyWhatsAppProducts', JSON.stringify(savedWhatsAppProducts));
                    } catch (e) { }
                }
                successMsg.style.display = 'block';
                successMsg.textContent = 'سيتم إعلامك عندما يكون المنتج متوفرًا في المخزون!';
            } else {
                alert('عذراً، حدث خطأ أثناء تسجيل طلب التنبيه.');
            }
        } catch (err) {
            console.error(err);
        } finally {
            Wsbutton.disabled = false;
            Wsbutton.textContent = originalText;
        }
    }

    Wsbutton.addEventListener('click', submitStockNotify);

    whatsappInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            submitStockNotify(e);
        }
    });
}

/**
 * Send notify payload to server
 */
async function add_product_on_notify_system(product_id, whatsappln_customer_mobile) {
    var storeId = (typeof whatsappln_store_id !== 'undefined') ? whatsappln_store_id : '';
    if (!storeId) {
        console.warn('WhatsAppLn: Store ID is missing.');
        return false;
    }

    var apiUrl = "https://whats.line.sa/api/v1/whatsapp-notify-stock-product/salla/" + storeId;
    var productName = document.querySelector('.main-content > h1')?.innerText?.trim()
        || document.querySelector('meta[property="og:title"]')?.getAttribute('content')
        || document.title;

    try {
        var response = await fetch(apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_phone: whatsappln_customer_mobile || null,
                product_name: productName || '',
                product_url: window.location.href,
                product_id: product_id,
            }),
        });

        var resData = await response.json().catch(() => null);
        if (!response.ok) {
            console.warn('WhatsAppLn: Notify error:', resData);
            return false;
        }
        return true;
    } catch (err) {
        console.error('WhatsAppLn: Network error:', err);
        return false;
    }
}

// Initial execution
render_whatsapp_icon();
render_whatsapp_remember_me_on_stock();

// Backup execution when DOM is fully loaded or on Salla SPA navigation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        render_whatsapp_icon();
        render_whatsapp_remember_me_on_stock();
    });
}

if (typeof window !== 'undefined' && window.salla && window.salla.event && typeof window.salla.event.on === 'function') {
    try {
        window.salla.event.on('product::loaded', () => {
            render_whatsapp_remember_me_on_stock();
        });
    } catch (e) { }
}
