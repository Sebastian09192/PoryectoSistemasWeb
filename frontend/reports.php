<?php
$page_title = 'Reportes · Tienda Virtual';
include 'template/header.php';

// --- INICIO: LÓGICA DE BACKEND EN EL MISMO ARCHIVO ---
try {
    // La ruta a tu archivo de conexión a la base de datos, corregida para tu estructura de carpetas.
    require_once '../backend/config/Database.php'; 
    
    $database = new Database();
    $pdo = $database->getConnection();

    $sql = "SELECT id, usuario_id, total, estado, fecha_pedido FROM pedidos ORDER BY fecha_pedido DESC";
    $stmt = $pdo->query($sql);
    $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    $pedidos = null;
    $error_message = 'Error en la base de datos: ' . $e->getMessage();
}
// --- FIN: LÓGICA DE BACKEND EN EL MISMO ARCHIVO ---
?>

<main class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h4 mb-0">Reporte de Ventas</h1>
        <button class="btn btn-secondary" id="btnExportPdf"><i class="fa fa-file-pdf me-1"></i> Exportar a PDF</button>
    </div>

    <div class="table-responsive" id="reportTable">
        <table class="table align-middle table-striped table-hover">
            <thead>
                <tr>
                    <th>ID de Pedido</th>
                    <th>ID de Usuario</th>
                    <th>Fecha</th>
                    <th class="text-end">Monto Total (₡)</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody id="reportsTableBody">
                <?php if (!empty($pedidos)): ?>
                    <?php foreach ($pedidos as $pedido): ?>
                        <tr>
                            <td><a href="factura.php?id=<?php echo htmlspecialchars($pedido['id']); ?>" target="_blank"><?php echo htmlspecialchars($pedido['id']); ?></a></td>
                            <td><?php echo htmlspecialchars($pedido['usuario_id']); ?></td>
                            <td><?php echo date('d/m/Y', strtotime($pedido['fecha_pedido'])); ?></td>
                            <td class="text-end"><?php echo '₡' . number_format($pedido['total'], 2); ?></td>
                            <td><?php echo htmlspecialchars($pedido['estado']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5" class="text-center text-danger"><?php echo isset($error_message) ? $error_message : 'No hay ventas registradas.'; ?></td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>

<?php
include 'template/footer.php';
?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<script>
    document.getElementById('btnExportPdf').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const reportTable = document.getElementById('reportTable'); // Seleccionamos solo el contenedor de la tabla

        html2canvas(reportTable, { scale: 0.8 }).then(canvas => { // scale: 0.8 hará que la imagen sea más pequeña
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            // Título "Reporte de Ventas" en azul marino y centrado
            const title = "Reporte de Ventas";
            const titleFontSize = 18;
            pdf.setFontSize(titleFontSize);
            pdf.setTextColor(23, 56, 100); // Azul Marino (RGB)
            pdf.text(title, pdfWidth / 2, 20, { align: 'center' }); // Ajustamos la posición Y para el título

            // Calcular las propiedades de la imagen para ajustarla al PDF, dejando espacio para el título
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;

            const marginX = 10; // Margen lateral
            const marginY = 30; // Margen superior para dejar espacio para el título
            
            const availableWidth = pdfWidth - (2 * marginX);
            const actualImageWidth = availableWidth;
            const actualImageHeight = (imgHeight * actualImageWidth) / imgWidth;

            // Centrar la imagen horizontalmente
            const xOffset = marginX;

            pdf.addImage(imgData, 'PNG', xOffset, marginY, actualImageWidth, actualImageHeight);
            pdf.save('reporte_ventas.pdf');
        });
    });
</script>