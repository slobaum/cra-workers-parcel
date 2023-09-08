var watch = require('node-watch');
var { spawn } = require('child_process');

spawn(
    'npm',
    ['run', 'workers:build:all'],
    { stdio: 'inherit' }
);
watch('./workers/', { recursive: true }, function(evt, name) {
    spawn(
        'npm',
        ['run', 'worker:build', name],
        { stdio: 'inherit' }
    );
});
