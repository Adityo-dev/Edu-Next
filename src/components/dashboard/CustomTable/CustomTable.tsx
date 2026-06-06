import { ITableProps } from '@/types/custom-table.types';

const CustomTable = <T extends object>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="custom-scrollbar overflow-x-auto rounded-md border border-slate-200 bg-white shadow-xs">
      <table className="min-w-full divide-y divide-slate-100">
        <thead>
          <tr className="bg-slate-50">
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-5 py-4 text-left text-xs font-bold tracking-wider text-nowrap uppercase opacity-70"
              >
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="text-text-secondary px-5 py-4 text-sm whitespace-nowrap"
                >
                  {'accessor' in column && column?.accessor
                    ? String(row[column?.accessor] ?? '')
                    : column?.cell?.(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
