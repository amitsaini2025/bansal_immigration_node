import{t as e}from"./dom-ready-Dtx5ZVyj.js";function t(e){let t=!!e.regional,n=e.suburb,r=e.state,i=e.postcode,a=e.category||(t?`Category 2/3`:`Category 1, Not Regional – Major Cities`);return`
        <div class="p-4 rounded-lg ${t?`bg-green-100 border border-green-200`:`bg-yellow-100 border border-yellow-200`}">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 ${t?`text-green-600`:`text-yellow-600`}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${t?`M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z`:`M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z`}" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h4 class="text-lg font-semibold ${t?`text-green-800`:`text-yellow-800`}">
                        ${t?`Regional Area`:`Metropolitan Area`}
                    </h4>
                    <div class="mt-2 text-sm ${t?`text-green-700`:`text-yellow-700`}">
                        <p><strong>Postcode:</strong> ${i}</p>
                        <p><strong>Area:</strong> ${n}</p>
                        <p><strong>State:</strong> ${r}</p>
                        <p><strong>Regional Status:</strong> ${t?`Yes - May qualify for regional points`:`No - Metropolitan area`}</p>
                        <p><strong>Category:</strong> ${a}</p>
                    </div>
                </div>
            </div>
        </div>
    `}function n(e){return`
        <div class="p-4 rounded-lg bg-gray-100 border border-gray-200">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h4 class="text-lg font-semibold text-gray-800">Postcode Not Found</h4>
                    <div class="mt-2 text-sm text-gray-700">
                        <p>We don't have information for postcode ${e} in our database.</p>
                        <p class="mt-2">Please contact our migration experts for accurate information about this postcode's regional status.</p>
                    </div>
                </div>
            </div>
        </div>
    `}function r(e,t,n){let r=e[0];if(t&&n){let i=e.find(e=>e.suburb===t&&e.state===n);i&&(r=i)}else if(t){let n=e.find(e=>e.suburb===t);n&&(r=n)}return r}function i(e=document){let i=e.getElementById(`postcodeForm`),a=e.getElementById(`postcode`),o=e.getElementById(`postcodeSuggestions`),s=e.getElementById(`results`),c=e.getElementById(`resultContent`);if(!i||!a||!o||!s||!c||i.dataset.postcodeCheckerInit===`true`)return;i.dataset.postcodeCheckerInit=`true`;let l;function u(){o.classList.add(`hidden`),o.innerHTML=``}i.addEventListener(`submit`,i=>{i.preventDefault();let o=a.value,l=e.getElementById(`selectedPostcode`)?.value??``,u=e.getElementById(`selectedState`)?.value??``,d=e.getElementById(`selectedSuburb`)?.value??``,f=l||o;fetch(`/api/postcode/check?search=${encodeURIComponent(f)}`).then(e=>e.json()).then(e=>{Array.isArray(e)&&e.length>0?c.innerHTML=t(r(e,d,u)):c.innerHTML=n(f),s.classList.remove(`hidden`)}).catch(()=>{c.innerHTML=`<div class="text-red-600">Error checking postcode. Please try again later.</div>`,s.classList.remove(`hidden`)})}),a.addEventListener(`input`,()=>{let t=e.getElementById(`selectedSuburb`),n=e.getElementById(`selectedPostcode`),r=e.getElementById(`selectedState`);t&&(t.value=``),n&&(n.value=``),r&&(r.value=``),clearTimeout(l);let s=a.value.trim();if(s.length<2){u();return}l=setTimeout(()=>{fetch(`/api/postcode/suggest?q=${encodeURIComponent(s)}`).then(e=>e.json()).then(e=>{if(!Array.isArray(e)||e.length===0){u();return}o.innerHTML=``,e.forEach(e=>{let s=document.createElement(`button`);s.type=`button`,s.className=`w-full text-left px-3 py-2 hover:bg-gray-100`,s.textContent=`${e.suburb} (${e.postcode}, ${e.state})`,s.addEventListener(`click`,()=>{a.value=e.suburb,t&&(t.value=e.suburb),n&&(n.value=e.postcode),r&&(r.value=e.state),u(),i.dispatchEvent(new Event(`submit`,{cancelable:!0}))}),o.appendChild(s)}),o.classList.remove(`hidden`)}).catch(()=>u())},300)}),e.addEventListener(`click`,e=>{!o.contains(e.target)&&e.target!==a&&u()})}e(()=>i());