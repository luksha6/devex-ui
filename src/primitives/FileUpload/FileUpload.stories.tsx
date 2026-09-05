import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

function Example({
  accept,
  multiple = true,
  maxFiles,
}: {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      label="Corpus dump"
      files={files}
      onChange={setFiles}
      accept={accept}
      multiple={multiple}
      maxFiles={maxFiles}
      maxSize={1024 * 1024}
      hint="Drop onto the tile or browse. Images show a preview."
    />
  );
}

const meta: Meta<typeof FileUpload> = {
  title: 'Primitives/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'Drop or browse. Empty is a dashed tile. Files become a grid. Images preview. Remove sits on the tile.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = { render: () => <Example accept=".json,.txt,image/*" /> };
export const Images: Story = { render: () => <Example accept="image/*" maxFiles={4} /> };
export const Single: Story = { render: () => <Example accept=".txt" multiple={false} /> };
