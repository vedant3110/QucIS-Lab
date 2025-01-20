function buttons(){
    const option=document.getElementById("dropdown").value
    if(option=="Free" || option=="Rabi"){
        let container = document.getElementById('Add_value');
            container.innerHTML=''
        const label_1= document.createElement('label');
        const input_1= document.createElement('input');
            label_1.setAttribute('for','delta');
            label_1.innerText = "Delta:";
            label_1.className = "Delta_style";
            input_1.id = "delta";
            input_1.type = "number";
            input_1.className = "Delta_style";
        const input_2= document.createElement('input');
        const label_2= document.createElement('label');
            label_2.setAttribute('for','beta');
            label_2.innerText = "Beta:";
            label_2.className = "Beta_style";
            input_2.id = "beta";
            input_2.type = "number";
            input_2.className = "Beta_style";
        const input_3= document.createElement('input');
        const label_3= document.createElement('label');
            label_3.setAttribute('for','ti');
            label_3.innerText = "Time Initial:";
            label_3.className = "ti_style";
            input_3.id = "ti";
            input_3.type = "number";
            input_3.className = "ti_style";
        const input_4= document.createElement('input');
        const label_4= document.createElement('label');
            label_4.setAttribute('for','tf');
            label_4.innerText = "Time Final:";
            label_4.className = "tf_style";
            input_4.id = "tf";
            input_4.type = "number";
            input_4.className = "tf_style";    
        let div_1 = document.createElement('div');
            div_1.id="style_label_1";
            div_1.appendChild(label_1);
            div_1.appendChild(input_1);
        let div_2 = document.createElement('div');
            div_2.id="style_label_2";    
            div_2.appendChild(label_2);
            div_2.appendChild(input_2);
        let div_3 = document.createElement('div');
            div_3.id="style_label_3";
            div_3.appendChild(label_3);
            div_3.appendChild(input_3);
        let div_4 = document.createElement('div');
            div_4.id="style_label_4";
            div_4.appendChild(label_4);
            div_4.appendChild(input_4);
            container.appendChild(div_1);
            container.appendChild(div_2);
            container.appendChild(div_3);
            container.appendChild(div_4);
        const time_button=document.createElement('button');
            time_button.onclick=time;
            time_button.innerText = "Time Evolution";
            time_button.id="time_button";
            container.appendChild(time_button);
    }
    else if(option=="Driven"){
        let container = document.getElementById('Add_value');
            container.innerHTML=''
        const label_1= document.createElement('label');
        const input_1= document.createElement('input');
            label_1.setAttribute('for','delta');
            label_1.innerText = "Delta:";
            label_1.className = "Delta_style";
            input_1.id = "delta";
            input_1.type = "number";
            input_1.className = "Delta_style";
        const input_2= document.createElement('input');
        const label_2= document.createElement('label');
            label_2.setAttribute('for','beta');
            label_2.innerText = "Beta:";
            label_2.className = "Beta_style";
            input_2.id = "beta";
            input_2.type = "number";
            input_2.className = "Beta_style";
        const input_3= document.createElement('input');
        const label_3= document.createElement('label');
            label_3.setAttribute('for','ti');
            label_3.innerText = "Time Initial:";
            label_3.className = "ti_style";
            input_3.id = "ti";
            input_3.type = "number";
            input_3.className = "ti_style";
        const input_4= document.createElement('input');
        const label_4= document.createElement('label');
            label_4.setAttribute('for','tf');
            label_4.innerText = "Time Final:";
            label_4.className = "tf_style";
            input_4.id = "tf";
            input_4.type = "number";
            input_4.className = "tf_style";
        const input_5= document.createElement('input');
        const label_5= document.createElement('label');
            label_5.setAttribute('for','gamma');
            label_5.innerText = "Gamma:";
            label_5.className = "Gamma_style";
            input_5.id = "gamma";
            input_5.type = "number";
            input_5.className = "Gamma_style";    
        let div_1 = document.createElement('div');
            div_1.id="style_label_1";
            div_1.appendChild(label_1);
            div_1.appendChild(input_1);
        let div_2 = document.createElement('div');
            div_2.id="style_label_2";    
            div_2.appendChild(label_2);
            div_2.appendChild(input_2);
        let div_3 = document.createElement('div');
            div_3.id="style_label_3";
            div_3.appendChild(label_3);
            div_3.appendChild(input_3);
        let div_4 = document.createElement('div');
            div_4.id="style_label_4";
            div_4.appendChild(label_4);
            div_4.appendChild(input_4);
        let div_5 = document.createElement('div');
            div_5.id="style_label_5";
            div_5.appendChild(label_5);
            div_5.appendChild(input_5);
            container.appendChild(div_1);
            container.appendChild(div_5);
            container.appendChild(div_2);
            container.appendChild(div_3);
            container.appendChild(div_4);
        const time_button=document.createElement('button');
            time_button.onclick=time;
            time_button.innerText = "Time Evolution";
            time_button.id="time_button";
            container.appendChild(time_button);
    }

}
function time(){
    const option=document.getElementById("dropdown").value
    if(option=="Free" || option=="Rabi"){
        const delta=document.getElementById("delta").value
        const beta=document.getElementById("beta").value
        const ti=document.getElementById("ti").value
        const tf=document.getElementById("tf").value
        fetch('http://127.0.0.1:5000/generate_evolution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  ham:option, de: delta, be: beta, time_intial:ti,time_final:tf   })
        })
        .then(response => response.blob()) 
        .then(gifBlob => {
            const gifUrl = URL.createObjectURL(gifBlob);
            document.getElementById('modalImage').src = gifUrl;
        });
        document.getElementById('myModal').style.display = 'flex';
    }
    else if(option=="Driven"){
        const delta=document.getElementById("delta").value
        const beta=document.getElementById("beta").value
        const gamma=document.getElementById("gamma").value
        const ti=document.getElementById("ti").value
        const tf=document.getElementById("tf").value
        fetch('http://127.0.0.1:5000/generate_evolution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  ham:option, de: delta, be: beta, ga:gamma, time_intial:ti, time_final:tf   })
        })
        .then(response => response.blob()) 
        .then(gifBlob => {
        const gifUrl = URL.createObjectURL(gifBlob);
        document.getElementById('modalImage').src = gifUrl;
    });
        document.getElementById('myModal').style.display = 'flex';
    }
}
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('modalImage').src = "";
}
function Save_img(){
    const image = document.getElementById('modalImage');
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'downloaded-image.jpg';
    link.click();
}

