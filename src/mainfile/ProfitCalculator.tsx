import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ProfitCalculator: React.FC = () => {
  const [biayaModal, setBiayaModal] = useState<number>(0);
  const [keuntunganHarian, setKeuntunganHarian] = useState<number[]>(Array(7).fill(0));
  const [profit, setProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleKeuntunganChange = (index: number, value: number) => {
    const updatedKeuntungan = [...keuntunganHarian];
    updatedKeuntungan[index] = value;
    setKeuntunganHarian(updatedKeuntungan);
  };

  const calculateProfit = () => {
    const totalKeuntungan = keuntunganHarian.reduce((a, b) => a + b, 0);
    return totalKeuntungan - biayaModal;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (biayaModal === 0 || keuntunganHarian.every(val => val === 0)) {
      setShowModal(true);
      return;
    }

    setProfit(calculateProfit());
  };

  const closeModal = () => setShowModal(false);

  const exportToExcel = async () => {
    const totalKeuntungan = keuntunganHarian.reduce((a, b) => a + b, 0);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Profit Analysis');

    // Add header
    worksheet.addRow(['Biaya Modal', biayaModal]);
    worksheet.addRow([]);
    worksheet.addRow(['Keuntungan Harian', 'Nilai']);

    keuntunganHarian.forEach((keuntungan, index) => {
      worksheet.addRow([`Hari ke-${index + 1}`, keuntungan]);
    });

    worksheet.addRow([]);
    worksheet.addRow(['Total Keuntungan', totalKeuntungan]);
    worksheet.addRow(['Profit', profit]);

    // Format cells
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    // Apply styling to header
    worksheet.getCell('A1').font = { bold: true };
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' }
    };
    worksheet.getCell('B1').font = { bold: true };
    worksheet.getCell('B1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' }
    };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Profit_Analysis.xlsx');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-bold">Biaya Modal (Rp):</label>
          <input
            type="number"
            value={biayaModal}
            onChange={(e) => setBiayaModal(parseFloat(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        {keuntunganHarian.map((keuntungan, index) => (
          <div key={index}>
            <label className="block mb-2 font-bold">Keuntungan Hari ke-{index + 1} (Rp):</label>
            <input
              type="number"
              value={keuntungan}
              onChange={(e) => handleKeuntunganChange(index, parseFloat(e.target.value))}
              className="border p-2 w-full"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Hitung Profit</button>
      </form>

      {profit !== null && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Hasil Analisis</h2>
          <p>Total Keuntungan: Rp{(profit + biayaModal).toLocaleString()}</p>
          <p>Biaya Modal: Rp{biayaModal.toLocaleString()}</p>
          <p>
            {profit >= 0
              ? `Profit selama seminggu: Rp${profit.toLocaleString()} (Menguntungkan)`
              : `Kerugian selama seminggu: Rp${Math.abs(profit).toLocaleString()} (Tidak Menguntungkan)`}
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Masukan input terlebih dahulu!</p>
            <button onClick={closeModal} className="bg-blue-500 text-white p-2 mt-4 rounded-lg">Tutup</button>
          </div>
        </div>
      )}

      {profit !== null && (
        <button onClick={exportToExcel} className="bg-green-500 text-white p-2 mt-4">Export to Spreadsheet</button>
      )}
    </div>
  );
};

export default ProfitCalculator;
