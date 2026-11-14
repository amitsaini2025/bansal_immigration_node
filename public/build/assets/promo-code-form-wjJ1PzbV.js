import{i as e}from"./ui-CV4-XOMI.js";import{t}from"./dom-ready-Dtx5ZVyj.js";function n(e,t,n,r){let i=e.value;i===`percentage`?(t.textContent=`Discount Percentage (%)`,n.textContent=`%`,r.max=100,r.placeholder=`10`):i===`fixed`&&(t.textContent=`Discount Amount ($)`,n.textContent=`$`,r.removeAttribute(`max`),r.placeholder=`25.00`)}function r(t=document){let r=t.querySelector(`[data-promo-code-form]`);if(!r)return;let i=r.querySelector(`#type`),a=r.querySelector(`#value_label`),o=r.querySelector(`#value_suffix`),s=r.querySelector(`#value`),c=r.querySelector(`#generate_code`),l=r.querySelector(`#code`),u=r.querySelector(`#test_calculation`),d=r.querySelector(`#test_result`),f=r.querySelector(`#test_result_content`);if(!i||!a||!o||!s||r.dataset.promoCodeInit===`true`)return;r.dataset.promoCodeInit=`true`;let p=r.dataset.generateCodeUrl,m=r.dataset.testCalculationUrl,h=document.querySelector(`meta[name="csrf-token"]`)?.getAttribute(`content`)??``,g=()=>n(i,a,o,s);i.addEventListener(`change`,g),c&&l&&p&&c.addEventListener(`click`,()=>{fetch(p,{method:`POST`,headers:{"Content-Type":`application/json`,"X-CSRF-TOKEN":h},body:JSON.stringify({length:8,prefix:``})}).then(e=>e.json()).then(e=>{l.value=e.code}).catch(e=>{})}),u&&d&&f&&m&&u.addEventListener(`click`,()=>{let t=i.value,n=s.value,a=r.querySelector(`#minimum_amount`)?.value??``,o=r.querySelector(`#maximum_discount`)?.value??``,c=r.querySelector(`#test_amount`)?.value??``,l=r.querySelector(`#test_enquiry_type`)?.value??``;if(!t||!n||!c){e(`Please fill in the required fields to test calculation.`,`warning`);return}fetch(m,{method:`POST`,headers:{"Content-Type":`application/json`,"X-CSRF-TOKEN":h},body:JSON.stringify({type:t,value:n,minimum_amount:a,maximum_discount:o,test_amount:c,enquiry_type:l})}).then(e=>e.json()).then(e=>{if(e.error){f.replaceChildren();let t=document.createElement(`p`);t.className=`text-red-600`,t.textContent=e.error,f.appendChild(t)}else f.innerHTML=`
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Original Amount:</span>
                                    <span class="font-medium">$${e.original_amount}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Discount Amount:</span>
                                    <span class="font-medium text-green-600">$${e.discount_amount}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Final Amount:</span>
                                    <span class="font-medium text-blue-600">$${e.final_amount}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Discount Percentage:</span>
                                    <span class="font-medium">${e.discount_percentage}%</span>
                                </div>
                            </div>
                        `;d.classList.remove(`hidden`)}).catch(e=>{f.replaceChildren();let t=document.createElement(`p`);t.className=`text-red-600`,t.textContent=`Error testing calculation.`,f.appendChild(t),d.classList.remove(`hidden`)})}),g()}t(()=>r());