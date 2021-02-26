## SVG-ColorSheet

light weight node script that renders a colorsheet of the provided hex codes

### Usage

1. clone the repo and `cd` into the directory
2. create a file named `data.json`
3. copy the file format into `data.json
```json
{
    "info": {
        "header": "header-name-here",
        "theme": "'dark' or 'light' (default: light)"
    },
    "data": {
        "label-name-here-1": {
            "display": "hex-code-here",
            "data": [
                "hex-code-here",
                "hex-code-here",
                "hex-code-here",
            ]
        },
        "label-name-here-2": {
            "display": "hex-code-here",
            "data": [
                "hex-code-here",
                "hex-code-here",
                "hex-code-here",
            ]
        },    
    }
}
```
4. change the placeholders with your own hex codes
5. add more objects in inside data if you please
6. in your terminal, run 
```bash
npm install
```
7. also in your terminal, run 
```bash
node index.js
```
8. the output files will be generated in the `./out` directory
