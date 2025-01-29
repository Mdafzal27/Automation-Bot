const { exec } = require('child_process');
const yargs = require('yargs');
 
// Function to run commands
function runTask(command, taskName) {
  console.log(`Running ${taskName}...`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`${taskName} failed:\n`, stderr);
    } else {
      console.log(`${taskName} completed:\n`, stdout);
    }
  });
}
 
// Command-line arguments
const argv = yargs
  .option('lint', { type: 'boolean', description: 'Run linting' })
  .option('test', { type: 'boolean', description: 'Run tests' })
  .option('path', { type: 'string', description: 'Specify file or folder path' })
  .help()
  .argv;
 
// Execute tasks based on arguments
if (argv.lint) {
  const path = argv.path || '.';
  runTask(`npx eslint ${path}`, 'Linting');
}
 
if (argv.test) {
  const path = argv.path || '.';
  runTask(`npx jest ${path}`, 'Testing');
}