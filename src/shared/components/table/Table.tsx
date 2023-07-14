import { TableProps } from 'antd';
import TableAntd from 'antd/es/table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <TableAntd {...props} />;
}

export default Table;
