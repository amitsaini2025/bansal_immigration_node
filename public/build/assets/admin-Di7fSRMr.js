import{i as e,t}from"./ui-CV4-XOMI.js";function n(e,t=`preview-img`,n=`image-preview`){if(!e?.files?.[0])return;let r=new FileReader;r.onload=function(e){let r=document.getElementById(t),i=document.getElementById(n);r&&(r.src=e.target.result),i&&i.classList.remove(`hidden`)},r.readAsDataURL(e.files[0])}function r(){document.addEventListener(`change`,e=>{let t=e.target;!(t instanceof HTMLInputElement)||!t.matches(`[data-image-preview]`)||n(t,t.dataset.previewImg||`preview-img`,t.dataset.previewContainer||`image-preview`)})}function i(e=document){let t=e.getElementById(`is_all_day`),n=e.getElementById(`time-fields`),r=e.getElementById(`recurrence_type`),i=e.getElementById(`recurrence-end-field`);if(!t||!n||!r||!i||t.dataset.blockedTimesInit===`true`)return;t.dataset.blockedTimesInit=`true`;function a(){n.style.display=t.checked?`none`:`grid`}function o(){i.style.display=r.value===`none`?`none`:`block`}t.addEventListener(`change`,a),r.addEventListener(`change`,o),a(),o()}var a=`info@bansalimmigration.com.au`,o=!1;function s(e){let t=document.getElementById(`forward-modal`),n=document.getElementById(`forward-form`);if(!t||!n||!e)return;n.action=`/admin/contacts/${e}/forward`;let r=document.getElementById(`recipient_email`),i=document.getElementById(`forward_message`);r&&(r.value=a),i&&(i.value=``),t.classList.remove(`hidden`)}function c(){let e=document.getElementById(`forward-modal`);e&&e.classList.add(`hidden`)}function l(){o||!document.getElementById(`forward-modal`)||(o=!0,document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-contact-forward]`);if(t){e.preventDefault(),s(t.dataset.contactId);return}e.target.closest(`[data-contact-forward-close]`)&&(e.preventDefault(),c())}))}function u(e){let t=document.getElementById(`visa-icon-${e}`);return t?t.innerHTML.trim():``}function d(e,t){let n=-1,r=RegExp(`^${t.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}\\[(\\d+)\\]`);return e.querySelectorAll(`input[name^="${t}["], textarea[name^="${t}["]`).forEach(e=>{let t=e.name.match(r);t&&(n=Math.max(n,parseInt(t[1],10)))}),n+1}function f(e){let t=d(e,`visa_pathways`)-1;return e.querySelectorAll(`[id^="steps-container-"]`).forEach(e=>{let n=e.id.match(/^steps-container-(\d+)$/);n&&(t=Math.max(t,parseInt(n[1],10)))}),t+1}function p(t){let n=d(t,`visa_costs`),r=f(t);n===0&&(n=parseInt(t.dataset.costIndex,10)||1),r===0&&(r=parseInt(t.dataset.pathwayIndex,10)||1);let i=parseInt(t.dataset.minItems,10)||0,a=t.dataset.costRemoveLabel??``,o=t.dataset.visaBulkForm===`true`,s=t.querySelector(`#costs-container`),c=t.querySelector(`#pathways-container`),l={trash:u(`trash`),plus:u(`plus`),x:u(`x`)};function p(){if(!s)return;let e=o?`mb-1`:`mb-2`,t=o?`cost-item border border-gray-200 rounded-lg p-4 mb-3`:`cost-item border border-gray-200 rounded-lg p-4 mb-4`,r=o?`md:col-span-3 grid grid-cols-3 gap-4`:`md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4`,i=document.createElement(`div`);i.className=t,i.innerHTML=`
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="${r}">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 ${e}">Cost Label</label>
                        <input type="text" name="visa_costs[${n}][label]" placeholder="e.g., Application Fee${o?``:`, Visa Fee, etc.`}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 ${e}">Amount</label>
                        <input type="text" name="visa_costs[${n}][amount]" placeholder="e.g., $4,045${o?`, N/A`:`, $1,500 AUD, N/A, etc.`}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 ${e}">Notes (Optional)</label>
                        <input type="text" name="visa_costs[${n}][notes]" placeholder="${o?`Additional info`:`Additional information`}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                </div>
                <div class="flex items-end">
                    <button type="button" data-visa-action="remove-cost" class="text-red-600 hover:text-red-800 p-2${o?``:` border border-red-300 rounded-lg hover:bg-red-50`}">
                        ${l.trash}${a}
                    </button>
                </div>
            </div>
        `,s.appendChild(i),n+=1}function m(t){let n=s?.querySelectorAll(`.cost-item`)??[];if(i>0&&n.length<=i){e(`You must have at least one cost field. Clear the fields instead of removing them.`,`warning`);return}t.closest(`.cost-item`)?.remove()}function h(){if(!c)return;let e=o?`mb-1`:`mb-2`,t=o?`pathway-item border border-gray-200 rounded-lg p-4 mb-3`:`pathway-item border border-gray-200 rounded-lg p-4 mb-4`,n=document.createElement(`div`);n.className=t,n.innerHTML=`
            <div class="grid grid-cols-1 gap-4">
                ${o?`
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Pathway Title</label>
                    <input type="text" name="visa_pathways[${r}][title]" placeholder="e.g., Skilled Migration Pathway" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Description</label>
                    <textarea name="visa_pathways[${r}][description]" rows="2" placeholder="Describe this pathway" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Requirements (Optional)</label>
                    <textarea name="visa_pathways[${r}][requirements]" rows="2" placeholder="List requirements" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>`:`
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 ${e}">Pathway Title</label>
                        <input type="text" name="visa_pathways[${r}][title]" placeholder="e.g., Skilled Migration Pathway, Family Reunion Pathway" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    </div>
                    <div class="flex items-end">
                        <button type="button" data-visa-action="remove-pathway" class="text-red-600 hover:text-red-800 p-2 border border-red-300 rounded-lg hover:bg-red-50">
                            ${l.trash} Remove
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Description</label>
                    <textarea name="visa_pathways[${r}][description]" rows="3" placeholder="Describe this pathway and what it involves" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Requirements (Optional)</label>
                    <textarea name="visa_pathways[${r}][requirements]" rows="2" placeholder="List specific requirements for this pathway" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 ${e}">Steps (Optional)</label>
                    <div id="steps-container-${r}"></div>
                    <button type="button" data-visa-action="add-step" data-pathway-index="${r}" class="text-orange-600 hover:text-orange-800 text-sm">
                        ${l.plus}Add Step
                    </button>
                </div>`}
            </div>
        `,c.appendChild(n),r+=1}function g(t){let n=c?.querySelectorAll(`.pathway-item`)??[];if(i>0&&n.length<=i){e(`You must have at least one pathway field. Clear the fields instead of removing them.`,`warning`);return}t.closest(`.pathway-item`)?.remove()}function _(e){let n=t.querySelector(`#steps-container-${e}`);if(!n)return;let r=document.createElement(`div`);r.className=`step-item flex items-center gap-2 mb-2`,r.innerHTML=`
            <input type="text" name="visa_pathways[${e}][steps][]" placeholder="Step description" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <button type="button" data-visa-action="remove-step" class="text-red-600 hover:text-red-800 p-1" title="Remove step" aria-label="Remove step">
                ${l.x}
            </button>
        `,n.appendChild(r)}function v(e){e.closest(`.step-item`)?.remove()}t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-visa-action]`);if(!(!n||!t.contains(n)))switch(e.preventDefault(),n.dataset.visaAction){case`add-cost`:p();break;case`remove-cost`:m(n);break;case`add-pathway`:h();break;case`remove-pathway`:g(n);break;case`add-step`:_(parseInt(n.dataset.pathwayIndex,10));break;case`remove-step`:v(n);break;default:break}})}var m=!1;function h(){if(m)return;let e=document.getElementById(`bulk-update-modal`);if(!e)return;m=!0;let t=e.querySelector(`[data-visa-bulk-form]`);function n(){e.classList.remove(`hidden`)}function r(){e.classList.add(`hidden`)}let i=t?.querySelector(`select[name="update_type"]`);i&&i.addEventListener(`change`,function(){let e=this.value,t={costs:document.getElementById(`costs-section`),processing_times:document.getElementById(`processing-times-section`),duration:document.getElementById(`duration-section`),pathways:document.getElementById(`pathways-section`)};Object.values(t).forEach(e=>e?.classList.add(`hidden`)),(e===`costs`||e===`all`)&&t.costs?.classList.remove(`hidden`),(e===`processing_times`||e===`all`)&&t.processing_times?.classList.remove(`hidden`),(e===`duration`||e===`all`)&&t.duration?.classList.remove(`hidden`),(e===`pathways`||e===`all`)&&t.pathways?.classList.remove(`hidden`)}),document.addEventListener(`click`,e=>{if(e.target.closest(`[data-visa-bulk-open]`)){e.preventDefault(),n();return}e.target.closest(`[data-visa-bulk-close]`)&&(e.preventDefault(),r())})}function g(){document.querySelectorAll(`[data-visa-management]`).forEach(e=>{p(e)}),h()}r(),document.addEventListener(`DOMContentLoaded`,()=>{i(),l(),g(),document.addEventListener(`click`,async n=>{let r=n.target.closest(`[data-toggle-active]`);if(!r||r.disabled||r.dataset.confirmPending===`true`)return;n.preventDefault(),n.stopPropagation();let i=r.dataset.toggleActive;if(!i)return;r.dataset.confirmPending=`true`;let a=!1;try{a=await t(r.getAttribute(`data-confirm-message`)||`Are you sure you want to toggle the active status?`,{title:r.getAttribute(`data-confirm-title`)||`Toggle status`,confirmLabel:r.getAttribute(`data-confirm-label`)||`Continue`})}finally{delete r.dataset.confirmPending}a&&fetch(`/admin/blocked-times/${i}/toggle-active`,{method:`POST`,headers:{"X-CSRF-TOKEN":document.querySelector(`meta[name="csrf-token"]`)?.getAttribute(`content`)??``,"Content-Type":`application/json`}}).then(e=>e.json()).then(t=>{t.success?location.reload():e(t.message||`Failed to update status`,`error`)}).catch(t=>{e(`An error occurred while updating the status.`,`error`)})})}),window.addEventListener(`load`,function(){document.body.classList.add(`loaded`)});