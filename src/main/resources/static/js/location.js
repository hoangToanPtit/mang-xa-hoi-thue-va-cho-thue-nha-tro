const provinces = document.getElementById('province');
const district = document.getElementById('district');
const wards = document.getElementById('wards');

// console.log(provinces, district, wards);

const hl = new Headers();
hl.append("Content-Type", "application/json");

(async () => {
    const res = await  fetch("https://provinces.open-api.vn/api/p", {
     method: 'GET'
    })
  
    const pro = await res.json();
    // console.log(pro);

    const html = await pro.map((p) => {
        return `
        <option value=${p.code} >${p.name}</option>
        `
    });

    provinces.innerHTML = `<option value="0" selected>Tỉnh/Thành phố</option>
                            ${html.join('\n')}`;

})();

provinces.addEventListener('change', async() => {
    console.log(provinces.value);
    console.log(provinces.options[provinces.selectedIndex].text);
    let code = provinces.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/p/${code}/?depth=2`, {
            method: 'GET'
        })
        const dis = (await res.json()).districts;
        // console.log(dis);

        const html = await dis.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        district.innerHTML = `<option value="0" selected>Quận/Huyện</option>
                            ${html.join('\n')}`;
    }
})

district.addEventListener('change', async() => {
    console.log(district.value);
    let code = district.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/d/${code}/?depth=2`, {
            method: 'GET'
        })
        const wa = (await res.json()).wards;
        // console.log(wa);

        const html = await wa.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        wards.innerHTML = `<option value="0" selected>Phường/Xã</option>
                            ${html.join('\n')}`;
    }
})





// ============ search
const provinces_s = document.getElementById('province-search');
const district_s = document.getElementById('district-search');
const wards_s = document.getElementById('wards-search');

// console.log(provinces_s, district_s, wards_s);

(async () => {
    const res = await  fetch("https://provinces.open-api.vn/api/p", {
     method: 'GET'
    })
  
    const pros = await res.json();
    // console.log(["abc", pros]);

    const html = await pros.map((p) => {
        return `
        <option value=${p.code} >${p.name}</option>
        `
    });

    if(provinces_s!=null)
    provinces_s.innerHTML = `<option value="0" selected>Tỉnh/Thành phố</option>
                            ${html.join('\n')}`;

})();
if(provinces_s!=null)
provinces_s.addEventListener('change', async() => {
    console.log(provinces_s.value);
    console.log(provinces_s.options[provinces_s.selectedIndex].text);
    let code = provinces_s.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/p/${code}/?depth=2`, {
            method: 'GET'
        })
        const dis = (await res.json()).districts;
        // console.log(dis);

        const html = await dis.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        district_s.innerHTML = `<option value="0" selected>Quận/Huyện</option>
                            ${html.join('\n')}`;
    }
})
if(district_s!=null)
district_s.addEventListener('change', async() => {
    console.log(district_s.value);
    let code = district_s.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/d/${code}/?depth=2`, {
            method: 'GET'
        })
        const wa = (await res.json()).wards;
        // console.log(wa);

        const html = await wa.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        wards_s.innerHTML = `<option value="0" selected>Phường/Xã</option>
                            ${html.join('\n')}`;
    }
})




// ============ edit
const provinces_ed = document.getElementById('province_edit');
const district_ed = document.getElementById('district_edit');
const wards_ed = document.getElementById('wards_edit');

// console.log(provinces_ed, district_ed, wards_ed);

(async () => {
    const res = await  fetch("https://provinces.open-api.vn/api/p", {
     method: 'GET'
    })
  
    const pros = await res.json();
    // console.log(["abc", pros]);

    const html = await pros.map((p) => {
        return `
        <option value=${p.code} >${p.name}</option>
        `
    });

    if(provinces_ed!=null)
    provinces_ed.innerHTML = `<option value="0" selected>Tỉnh/Thành phố</option>
                            ${html.join('\n')}`;

})();
if(provinces_ed!=null)
provinces_ed.addEventListener('change', async() => {
    console.log(provinces_ed.value);
    console.log(provinces_ed.options[provinces_ed.selectedIndex].text);
    let code = provinces_ed.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/p/${code}/?depth=2`, {
            method: 'GET'
        })
        const dis = (await res.json()).districts;
        // console.log(dis);

        const html = await dis.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        district_ed.innerHTML = `<option value="0" selected>Quận/Huyện</option>
                            ${html.join('\n')}`;
    }
})
if(district_ed!=null)
district_ed.addEventListener('change', async() => {
    console.log(district_ed.value);
    let code = district_ed.value;
    if(code != 0){
        const res = await  fetch(`https://provinces.open-api.vn/api/d/${code}/?depth=2`, {
            method: 'GET'
        })
        const wa = (await res.json()).wards;
        // console.log(wa);

        const html = await wa.map((p) => {
            return `
            <option value=${p.code} >${p.name}</option>
            `
        });

        wards_ed.innerHTML = `<option value="0" selected>Phường/Xã</option>
                            ${html.join('\n')}`;
    }
})