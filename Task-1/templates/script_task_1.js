 let no_qubits=null;
 let co_qubits=null;
 let Operations=[];
function Submit_qubit(){
    let input_qubit = document.getElementById("Qubits").value;
    let input_co_qubit = document.getElementById("Co_qubits").value;
    if (input_qubit == 0) {
        alert("The number of qubits cannot be 0. Please enter a valid number.");
        return;
    }
    no_qubits = input_qubit;
    if (input_co_qubit==null){
        co_qubits = 1;
    }
    else{
        co_qubits = input_co_qubit;
    }
    document.getElementById("text_container").innerText = `No of Qubits used in the circuit: ${input_qubit}\n`;
    
    let container = document.getElementById('Add_elements');
        container.innerHTML=''
    let container_temp_1 = document.getElementById('Add_gate');
    let container_temp_2 = document.getElementById('buttons');
        container_temp_1.innerHTML=''
        container_temp_2.innerHTML=''
    const label_1= document.createElement('label');
    const dropdown = document.createElement('select');
        dropdown.id = 'drop_down';
        dropdown.className = 'Operator';
        dropdown.onchange= dropdown.onchange = function() {
            input_maker();
            button_maker();
        };        
        label_1.setAttribute('for','Operator');
        label_1.innerText = "Select Operator:";
        label_1.className = 'Operator';
        const options = [
            { value: 'select', text: '--select--' },
            { value: 'cnot', text: 'C-Not gate' },
            { value: 'h', text: 'Harmard gate' },
            { value: 'x', text: 'X-gate' },
            { value: 'y', text: 'Y-gate' },
            { value: 'z', text: 'Z-gate' },
            { value: 'i', text: 'Identity gate' },
            { value: 's', text: 'S-gate' },
            { value: 't', text: 'T-gate' },
            { value: 'rx', text: 'RX Gate' },
            { value: 'ry', text: 'RY gate' },
            { value: 'rz', text: 'RZ gate' },
            { value: 'pg', text: 'Phase gate' },
            { value: 'cz', text: 'CZ gate' },
            { value: 'cy', text: 'CY gate' },
            { value: 'crx', text: 'CRX gate' },
            { value: 'cry', text: 'CRY gate' },
            { value: 'crz', text: 'CRZ gate' },
            { value: 'cpg', text: 'C-Phase gate' },
            { value: 'swap', text: 'Swap gate' },
            { value: 'ct', text: 'CT gate' },
            { value: 'cs', text: 'CS gate' },
            { value: 'toffoli', text: 'Toffoli gate' },
            { value: 'fredkin', text: 'Fredkin gate' },
            { value: 'measure', text: 'Measure' },
          ];
        options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            dropdown.appendChild(optionElement);
        });
    container.appendChild(label_1);
    container.appendChild(dropdown);

    //Boxcode
    const displayBox = document.createElement("div");

        displayBox.id = "displayBox";
        container.appendChild(displayBox);
}
function input_maker(){
        const option=document.getElementById("drop_down").value
        if(["cnot", "cz", "cy","ct","cs"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','control');
                label_2.innerText = "Control Qubit:";
                label_2.className = "Control_style";
                input_2.id = "control";
                input_2.type = "number";
                input_2.className = "Control_style";
            let div_1 = document.createElement('div');
                div_1.id="style_label_1";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                container.appendChild(div_1);
        }
        else if(["h", "x", "y","z","i","s","t"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            let div_1 = document.createElement('div');
                div_1.id="style_label_2";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                container.appendChild(div_1);
        }
        else if(["rx","ry","rz","pg"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','arg_value');
                label_2.innerText = "arg_value:";
                label_2.className = "arg_style";
                input_2.id = "arg_value";
                input_2.type = "number";
                input_2.className = "arg_style";
            let div_1 = document.createElement('div');
                div_1.id="style_label_1";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                container.appendChild(div_1);  

        }
        else if(["swap"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','target_1');
                label_2.innerText = "Target Qubit:";
                label_2.className = "Target_style";
                input_2.id = "target_1";
                input_2.type = "number";
                input_2.className = "Target_style";
            let div_1 = document.createElement('div');
                div_1.id="style_label_1";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                container.appendChild(div_1);

        }
        else if(["measure"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','classical');
                label_2.innerText = "Classical_qubit:";
                label_2.className = "Classical_style";
                input_2.id = "classical";
                input_2.type = "number";
                input_2.className = "Classical_style";
            let div_1 = document.createElement('div');
                div_1.id="style_label_1";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                container.appendChild(div_1);
        }
        else if(["crx","cry","crz","cpg"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','control');
                label_2.innerText = "Control Qubit:";
                label_2.className = "Control_style";
                input_2.id = "control";
                input_2.type = "number";
                input_2.className = "Control_style";
            const input_3= document.createElement('input');
            const label_3= document.createElement('label');
                label_3.setAttribute('for','arg_value');
                label_3.innerText = "arg_value:";
                label_3.className = "arg_style";
                input_3.id = "arg_value";
                input_3.type = "number";
                input_3.className = "arg_style";
            
            let div_1 = document.createElement('div');
                div_1.id="style_label_2";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                div_1.appendChild(label_3);
                div_1.appendChild(input_3);
                container.appendChild(div_1);
        }
        else if(["fredkin"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','target_1');
                label_2.innerText = "Target Qibit:";
                label_2.className = "Target_style";
                input_2.id = "target_1";
                input_2.type = "number";
                input_2.className = "Target_style";
            const input_3= document.createElement('input');
            const label_3= document.createElement('label');
                label_3.setAttribute('for','control');
                label_3.innerText = "Control Qubit:";
                label_3.className = "Control_style";
                input_3.id = "control";
                input_3.type = "number";
                input_3.className = "Control_style"
            
            let div_1 = document.createElement('div');
                div_1.id="style_label_2";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                div_1.appendChild(label_3);
                div_1.appendChild(input_3);
                container.appendChild(div_1);
        }
        else if(["toffoli"].includes(option)){
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
            const label_1= document.createElement('label');
            const input_1= document.createElement('input');
                label_1.setAttribute('for','target');
                label_1.innerText = "Target Qubit:";
                label_1.className = "Target_style";
                input_1.id = "target";
                input_1.type = "number";
                input_1.className = "Target_style";
            const input_2= document.createElement('input');
            const label_2= document.createElement('label');
                label_2.setAttribute('for','control');
                label_2.innerText = "Control Qubit:";
                label_2.className = "Control_style";
                input_2.id = "control_1";
                input_2.type = "number";
                input_2.className = "Control_style"
            const input_3= document.createElement('input');
            const label_3= document.createElement('label');
                label_3.setAttribute('for','control');
                label_3.innerText = "Control Qubit:";
                label_3.className = "Control_style";
                input_3.id = "control_2";
                input_3.type = "number";
                input_3.className = "Control_style"
            
            let div_1 = document.createElement('div');
                div_1.id="style_label_2";
                div_1.appendChild(label_1);
                div_1.appendChild(input_1);
                div_1.appendChild(label_2);
                div_1.appendChild(input_2);
                div_1.appendChild(label_3);
                div_1.appendChild(input_3);
                container.appendChild(div_1);
        }       
        else{
            let container = document.getElementById('Add_gate');
            container.innerHTML=''
        }
        }
function add(){
    let value_operator=document.getElementById("drop_down").value;
    let selectedOption = document.getElementById("drop_down").options[document.getElementById("drop_down").selectedIndex];
    let text_operator = selectedOption.text;
    if(["cnot", "cz", "cy","ct","cs"].includes(value_operator)){
        let value_target=document.getElementById("target").value;
        let value_control=document.getElementById("control").value;

        if (value_target>=no_qubits || value_control>=no_qubits || value_target<0 || value_control<0 || value_target==value_control){
            alert("Target Qubit or Control Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target,value_control])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target:[${value_target}] | Control:[${value_control}]\n`;
        }
    }
    else if(["h", "x", "y","z","i","s","t"].includes(value_operator)){
        let value_target=document.getElementById("target").value;

        if(value_target<0 || value_target>=no_qubits ){
            alert("Target Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target])
            document.getElementById("displayBox").innerText += `Added ${value_operator} : Target-{${value_target}}\n`;
        }
    }
    else if(["rx","ry","rz","pg"].includes(value_operator)){
        let value_target=document.getElementById("target").value;
        let value_arg=document.getElementById("arg_value").value;

        if (value_target>=no_qubits || value_target<0){
            alert("Target Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target,value_arg])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target:[${value_target}] | Theta:[${value_arg}]\n`;
        }
    }
    else if(["swap"].includes(value_operator)){
        let value_target_1=document.getElementById("target").value;
        let value_target_2=document.getElementById("target_1").value;

        if (value_target_1>=no_qubits || value_target_2>=no_qubits || value_target_1<0 || value_target_2<0 || value_target_1==value_target_2){
            alert("Qubits is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target_1,value_target_2])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target_1:[${value_target_1}] | Target_2:[${value_target_2}]\n`;
        }
    }
    else if(["measure"].includes(value_operator)){
        let value_target=document.getElementById("target").value;
        let value_classical=document.getElementById("classical").value;

        if (value_target>=no_qubits || value_classical>=co_qubits || value_target<0 || value_classical<0){
            alert("Qubits is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target,value_classical])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target:[${value_target}] | Classical Bit:[${value_classical}]\n`;

        }
    }
    else if(["crx","cry","crz","cpg"].includes(value_operator)){
        let value_target=document.getElementById("target").value;
        let value_control=document.getElementById("control").value;
        let value_arg=document.getElementById("arg_value").value;

        if (value_target>=no_qubits || value_control>=no_qubits || value_target<0 || value_control<0 || value_target==value_control){
            alert("Target Qubit or Control Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target,value_control,value_arg])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target:[${value_target}] | Control:[${value_control} | Theta:[${value_arg}]\n`;
        }
    }
    else if(["fredkin"].includes(value_operator)){
        let value_target_1=document.getElementById("target").value;
        let value_target_2=document.getElementById("target_1").value;
        let value_control=document.getElementById("control").value;

        if (value_target_1==value_target_2 || value_target_1<0 || value_target_2<0 || value_control>0|| value_target_1==value_control || value_target_2==value_control || value_target_1>=no_qubits || value_target_2>=no_qubits || value_control>=no_qubits){
            alert("Target Qubit or Control Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target_1,value_target_2,value_control])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target_1:[${value_target_1}] | Target_2:[${value_target_2} | Control:[${value_control}]\n`;
        }
    }
    else if(["toffoli"].includes(value_operator)){
        let value_control_1=document.getElementById("control_1").value;
        let value_control_2=document.getElementById("control_2").value;
        let value_target=document.getElementById("target").value;

        if (value_control_1==value_control_2 || value_control_1<0 || value_control_2<0 || value_target<0|| value_control_1==value_target || value_control_2==value_target || value_control_1>=no_qubits || value_control_2>=no_qubits || value_target>=no_qubits){
            alert("Target Qubit or Control Qubit is Wrong!!")
            return;
        }
        else{
            Operations.push([value_operator,value_target,value_control_1,value_control_2])
            document.getElementById("displayBox").innerText += `Added ${text_operator} | Target:[${value_target}] | Control_1:[${value_control_1} | Control_2:[${value_control_2}]\n`;
        }
    }

}
    
function button_maker(){
    const option=document.getElementById("drop_down").value
    if(option=="select" && Operations.length==0){
        let container = document.getElementById('buttons');
            container.innerHTML=''
    }
    else if(option=="select"){
        let container = document.getElementById('buttons');
            container.innerHTML=''
        let div_2 = document.createElement('div');
        const plot_button=document.createElement('button');
            div_2.id="style_button_1";
            plot_button.onclick=plot;
            plot_button.innerText = "plot";
            plot_button.id="plot_button";
            div_2.appendChild(plot_button);
            container.appendChild(div_2);
    }
    else{
        let container = document.getElementById('buttons');
            container.innerHTML=''
        let div_2 = document.createElement('div');
        const Add_button=document.createElement('button');
        const plot_button=document.createElement('button');
            div_2.id="style_button_1";
            Add_button.onclick=add;
            Add_button.innerText = "Add Gate";
            Add_button.id="Add_button";
            plot_button.onclick=plot;
            plot_button.innerText = "plot";
            plot_button.id="plot_button";
            div_2.appendChild(Add_button);
            div_2.appendChild(plot_button);
            container.appendChild(div_2);
    }
}
function plot(){
    fetch('http://127.0.0.1:5000/generate_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ array: Operations, no: no_qubits, co: co_qubits  })
    })
    .then(response => response.blob()) 
    .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById('modalImage').src = imageUrl;
    })
    
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
        
}
function Save_img(){
    const image = document.getElementById('modalImage');
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'downloaded-image.jpg';
    link.click();
}

