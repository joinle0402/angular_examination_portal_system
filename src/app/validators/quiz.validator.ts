import { FormControl } from "@angular/forms";

export function numberValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && isNaN(Number(value))) {
        return { notNumber: true };
    }
    return null;
}
