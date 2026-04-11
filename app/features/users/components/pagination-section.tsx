import { FieldLabel, FieldSet } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PaginationSection({
  rowPerPage,
  onChangeValue,
}: {
  rowPerPage: number;
  onChangeValue: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-6">
      <FieldSet className="flex flex-row w-full  items-center gap-2">
        <FieldLabel className="">Rows per page</FieldLabel>
        <Select
          defaultValue="5"
          onValueChange={(value) => {
            onChangeValue(Number(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>{' '}
      </FieldSet>
    </div>
  );
}
