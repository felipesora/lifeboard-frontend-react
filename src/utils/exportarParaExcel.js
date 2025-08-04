import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/**
 * Exporta dados para um arquivo Excel (.xlsx)
 * @param {Array<Object>} dados - Lista de objetos (linhas)
 * @param {string} nomeArquivo - Nome do arquivo para download
 * @param {string} nomePlanilha - Nome da aba da planilha
 */
export async function exportarParaExcel(dados, nomeArquivo, nomePlanilha = 'Planilha') {
    if (!dados || dados.length === 0) {
        console.warn('Nenhum dado para exportar');
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(nomePlanilha);

    // Pega os nomes das colunas baseado nas chaves do primeiro objeto
    const colunas = Object.keys(dados[0]).map((chave) => ({
        header: chave,
        key: chave,
        width: 30,
    }));

    worksheet.columns = colunas;

    // Estilizar cabeçalhos
    colunas.forEach((_, index) => {
        const cell = worksheet.getRow(1).getCell(index + 1);
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF37474F' }, // Cor de fundo
        };
        cell.font = {
            color: { argb: 'FFFFFFFF' }, // Cor da fonte (branco)
            bold: true,
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
        };
    });


    // Adiciona os dados
    dados.forEach((linha) => {
        worksheet.addRow(linha);
    });

    // Gera o arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${nomeArquivo}.xlsx`);
}