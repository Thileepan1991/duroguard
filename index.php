<?php
// Ferrolux Architectural Doors - Production Apache Entry Point
// Serves the compiled production WebGL & React Three Fiber application for XAMPP Apache

$distHtml = __DIR__ . '/dist/index.html';

if (file_exists($distHtml)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($distHtml);
    exit;
} else {
    echo "<h1>Ferrolux Doors: Production build not found. Run 'npm run build'.</h1>";
}
