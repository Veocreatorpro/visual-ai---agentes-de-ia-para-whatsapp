import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/AI/Documents/visual-ai---agentes-de-ia-para-whatsapp/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

function processClasses(classesStr) {
    let classes = classesStr.split(/\s+/).filter(Boolean);
    // Remove existing generated dark classes to avoid duplicates
    classes = classes.filter(c => !c.match(/^dark:(bg|text|border|ring|from|to|via)-/));
    
    let toAdd = new Set();
    for (let c of classes) {
      if (c === 'bg-white') toAdd.add('dark:bg-slate-900');
      if (c === 'bg-slate-50') toAdd.add('dark:bg-slate-800/40');
      if (c === 'bg-slate-100') toAdd.add('dark:bg-slate-800');
      if (c === 'bg-slate-900') toAdd.add('dark:bg-slate-950');
      if (c === 'text-slate-900') toAdd.add('dark:text-white');
      if (c === 'text-slate-800') toAdd.add('dark:text-slate-100');
      if (c === 'text-slate-700') toAdd.add('dark:text-slate-300');
      if (c === 'text-slate-600') toAdd.add('dark:text-slate-400');
      if (c === 'text-slate-500') toAdd.add('dark:text-slate-400');
      if (c === 'text-slate-400') toAdd.add('dark:text-slate-500');
      if (c === 'border-slate-100') toAdd.add('dark:border-slate-800');
      if (c === 'border-slate-200') toAdd.add('dark:border-slate-700');
      if (c === 'border-slate-800') toAdd.add('dark:border-slate-800');
      if (c === 'shadow-xl' || c === 'shadow-sm') toAdd.add('dark:shadow-none');
    }
    return [...classes, ...toAdd].join(' ');
}

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Clean up any stray quotes inside strings that could break the simple regex
  content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
    return `className=${quote}${processClasses(classes)}${quote}`;
  });

  content = content.replace(/className=\{`([^`]+)`\}/g, (match, classes) => {
    let parts = classes.split(/(\$\{.*?\})/);
    for (let i = 0; i < parts.length; i++) {
        if (!parts[i].startsWith('${')) {
            parts[i] = processClasses(parts[i]);
        }
    }
    return `className={\`${parts.join('')}\`}`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('✅ Dark mode classes injected into all components.');
