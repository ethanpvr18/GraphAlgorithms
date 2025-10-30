export class Toolbar {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('toolbar');

        this.openBtn = document.createElement('input');
        this.openBtn.type = 'button';
        this.openBtn.value = 'Open';
        this.openBtn.classList.add('btn');
        this.openBtn.classList.add('dropdown-button');

        this.saveBtn = document.createElement('input');
        this.saveBtn.type = 'button';
        this.saveBtn.value = 'Save';
        this.saveBtn.classList.add('btn');
        this.saveBtn.classList.add('dropdown-button');
        
        this.closeBtn = document.createElement('input');
        this.closeBtn.type = 'button';
        this.closeBtn.value = 'Close';
        this.closeBtn.classList.add('btn');
        this.closeBtn.classList.add('dropdown-button');

        this.printBtn = document.createElement('input');
        this.printBtn.type = 'button';
        this.printBtn.value = 'Print';
        this.printBtn.classList.add('btn');
        this.printBtn.classList.add('dropdown-button');

        this.dfsBtn = document.createElement('input');
        this.dfsBtn.type = 'button';
        this.dfsBtn.value = 'Depth First Search';
        this.dfsBtn.classList.add('btn');
        this.dfsBtn.classList.add('dropdown-button');

        this.bfsBtn = document.createElement('input');
        this.bfsBtn.type = 'button';
        this.bfsBtn.value = 'Breadth First Search';
        this.bfsBtn.classList.add('btn');
        this.bfsBtn.classList.add('dropdown-button');

        this.topoSortBtn = document.createElement('input');
        this.topoSortBtn.type = 'button';
        this.topoSortBtn.value = 'Topological Sort';
        this.topoSortBtn.classList.add('btn');
        this.topoSortBtn.classList.add('dropdown-button');

        this.mstBtn = document.createElement('input');
        this.mstBtn.type = 'button';
        this.mstBtn.value = 'Minimum Spanning Tree';
        this.mstBtn.classList.add('btn');
        this.mstBtn.classList.add('dropdown-button');

        this.fileDropdown = document.createElement('div');
        this.fileDropdown.classList.add('dropdown');

        this.fileDropdownTitle = document.createElement('input');
        this.fileDropdownTitle.type = 'button';
        this.fileDropdownTitle.value = 'File';
        this.fileDropdownTitle.classList.add('dropdown-title');
        this.fileDropdownTitle.classList.add('btn');

        this.fileDropdownContent = document.createElement('div');
        this.fileDropdownContent.classList.add('dropdown-content');

        this.runDropdown = document.createElement('div');
        this.runDropdown.classList.add('dropdown');

        this.runDropdownTitle = document.createElement('input');
        this.runDropdownTitle.type = 'button';
        this.runDropdownTitle.value = 'Run';
        this.runDropdownTitle.classList.add('dropdown-title');
        this.runDropdownTitle.classList.add('btn');

        this.runDropdownContent = document.createElement('div');
        this.runDropdownContent.classList.add('dropdown-content');

        this.fileDropdownContent.appendChild(this.openBtn);
        this.fileDropdownContent.appendChild(this.saveBtn);
        this.fileDropdownContent.appendChild(this.closeBtn);
        this.fileDropdownContent.appendChild(this.printBtn);

        this.fileDropdown.appendChild(this.fileDropdownTitle);
        this.fileDropdown.appendChild(this.fileDropdownContent);

        this.runDropdownContent.appendChild(this.dfsBtn);
        this.runDropdownContent.appendChild(this.bfsBtn);
        this.runDropdownContent.appendChild(this.topoSortBtn);
        this.runDropdownContent.appendChild(this.mstBtn);

        this.runDropdown.appendChild(this.runDropdownTitle);
        this.runDropdown.appendChild(this.runDropdownContent);

        this.element.appendChild(this.fileDropdown);
        this.element.appendChild(this.runDropdown);

        this.controlsDialog = document.createElement('div');
        this.controlsDialog.classList.add('controls-dialog');
        this.controlsDialog.style.position = 'fixed';
        this.controlsDialog.style.left = '50%';
        this.controlsDialog.style.top = '50%';
        this.controlsDialog.style.transform = 'translate(-50%, -50%)';
        this.controlsDialog.style.width = '1rem';
        this.controlsDialog.style.height = '5rem';
        this.controlsDialog.style.display = 'block';
        this.controlsDialog.style.zIndex = 10;
        this.controlsDialog.style.textAlign = 'center';
        this.controlsDialog.classList.add('dialog');

        this.labelOne = document.createElement('label');
        this.labelOne.textContent = 'User Controls: ';
        this.labelOne.classList.add('label');
        this.labelOne.classList.add('controls-title');
        this.controlsDialog.appendChild(this.labelOne);

        this.labelTwo = document.createElement('li');
        this.labelTwo.textContent = 'Double click to create / modify vertices and edges';
        this.labelTwo.classList.add('controls');
        this.controlsDialog.appendChild(this.labelTwo);

        this.labelThree = document.createElement('li');
        this.labelThree.textContent = 'Click to select / move vertices and edges';
        this.labelThree.classList.add('controls');
        this.controlsDialog.appendChild(this.labelThree);

        document.body.appendChild(this.controlsDialog);

        document.body.appendChild(this.element);
    }
}