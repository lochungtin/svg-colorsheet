class Node {

    content = [];
    attr = {};
    tag = '';

    constructor(tag){
        this.tag = tag;
    }

    append = child => this.content.push(child);

    attr = (field, value) => this.attr[field] = value;
    
    set = child => this.content = child;

    write = () => {
        let attrStr = '';
        Object.keys(this.attr).forEach(key => {
            attrStr += ` ${key}="${this.attr[key].toString().replaceAll(`'`, '').replaceAll(`"`, '')}"`
        });

        let child = '';
        if (this.content) {
            if (typeof this.content !== 'string')
                this.content.forEach(node => child += node.write());
            else
                child = this.content;
        }

        return `<${this.tag + attrStr}>${child}</${this.tag}>`;
    }
}

module.exports = Node;