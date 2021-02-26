const sharp = require('sharp');
const fs = require('fs');

const Node = require('./node');
const data = require('./data.json');

const colorClasses = Object.keys(data.data);
const colCount = 5;
let rowCount = 0;
colorClasses.forEach(key => {
    let colors = data.data[key].data.length;
    rowCount += Math.ceil(colors / colCount);
});

const root = new Node('svg');

root.attr('height', 200 * (rowCount + colorClasses.length) + 300);
root.attr('width', 500 * colCount);
root.attr('version', 1.1);
root.attr('xmlns', 'http://www.w3.org/2000/svg');

const base = new Node('rect');
base.attr('height', '100%');
base.attr('width', '100%');
base.attr('fill', data.info.theme.toLowerCase() === 'dark' ? '#1e1e1e' : '#ffffff');

root.append(base);

let rowOffset = 0;
let colOffset = 0;

const header = new Node('text');
header.attr('x', 250 * colCount);
header.attr('y', 150);
header.attr('text-anchor', 'middle');
header.attr('fill', data.info.theme.toLowerCase() === 'dark' ? '#e0e0e0' : '#1e1e1e');
header.attr('font-size', 80);
header.attr('font-family', 'monospace');
header.set(data.info.header);
root.append(header);

rowOffset += 300;

colorClasses.forEach(key => {
    const section = data.data[key];
    const colors = section.data;

    const title = new Node('text');
    title.attr('x', 150);
    title.attr('y', 150 + rowOffset);
    title.attr('text-anchor', 'middle');
    title.attr('fill', section.display);
    title.attr('font-size', 60);
    title.attr('font-family', 'monospace');
    title.set(key.toUpperCase());
    root.append(title)

    rowOffset += 200;

    const grid = [];
    let row = [];
    colors.forEach(color => {
        row.push(color);
        if (row.length === colCount) {
            grid.push(row);
            row = new Array();
        }
    });
    if (row.length !== 0)
        grid.push(row);

    grid.forEach(row => {
        row.forEach(cell => {
            const rect = new Node('rect');
            rect.attr('x', 25 + colOffset);
            rect.attr('y', 25 + rowOffset);
            rect.attr('height', 100);
            rect.attr('width', 100);
            rect.attr('fill', cell);
            root.append(rect);

            const label = new Node('rect');
            label.attr('x', 125 + colOffset);
            label.attr('y', 25 + rowOffset);
            label.attr('height', 100);
            label.attr('width', 325);
            label.attr('fill', data.info.theme.toLowerCase() === 'dark' ? '#3e3e3e' : '#eeeeee');
            root.append(label);

            const text = new Node('text');
            text.attr('x', 287 + colOffset);
            text.attr('y', 100 + rowOffset);
            text.attr('text-anchor', 'middle');
            text.attr('fill', data.info.theme.toLowerCase() === 'dark' ? '#e0e0e0' : '#1e1e1e');
            text.attr('font-size', 60);
            text.attr('font-family', 'monospace');
            text.set(cell);
            root.append(text)

            colOffset += 500;
        });
        colOffset = 0;
        rowOffset += 200;
    })
})

try {
    fs.mkdirSync('./out');
}
catch (err) { }

fs.writeFile(`./out/colorsheet-${data.info.theme}.svg`, root.write(), () => {
    console.log('SVG Generated')
    sharp(`./out/colorsheet-${data.info.theme}.svg`)
        .png()
        .toFile(`./out/colorsheet-${data.info.theme}.png`)
        .then(info => console.log('PNG Generated'))
        .catch(err => console.log(`Error Generating PNG: ${err}`));
}
);