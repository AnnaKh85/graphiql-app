import React from 'react';
import TextEditor from '@app/lib/components/TextEditor/TextEditor';
import { vi, expect  } from 'vitest';
import {render} from "@testing-library/react";
import { screen, fireEvent } from '@testing-library/react'

vi.mock('@app/lib/utils/beautifyUtils', () => ({
    makeItBeautiful: vi.fn((value) => `beautiful-${value}`)
}));

describe('TextEditor', () => {

    it('should update the textarea value when props.value changes', () => {
        const handleChange = vi.fn();
        const { rerender } = render(
            <TextEditor
                beautifyTrigger={0}
                value="initial value"
                onChange={handleChange}
            />
        );
    
        // Initial render check
        const textarea = screen.getByTestId('text-editor-textarea', { exact: true });
        expect(textarea).toHaveValue('initial value');
    
        // Update props.value
        rerender(
            <TextEditor
                beautifyTrigger={0}
                value="updated value"
                onChange={handleChange}
            />
        );
    
        // Check if the textarea value is updated
        expect(textarea).toHaveValue('updated value');
    });

    it('should call props.onChange with the new value when the textarea value changes', () => {
        const handleChange = vi.fn();
        render(
            <TextEditor
                beautifyTrigger={0}
                value="initial value"
                onChange={handleChange}
            />
        );

        const textarea = screen.getByTestId('text-editor-textarea', { exact: true });
        fireEvent.change(textarea, { target: { value: 'new value' } });

        expect(handleChange).toHaveBeenCalledWith('new value');
    });
});
