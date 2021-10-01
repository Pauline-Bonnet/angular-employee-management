import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'getAge'
})
export class GetAgePipe implements PipeTransform {
    transform(birthDate: string): number {
        const [yearBirth, monthBirth, dayBirth] =  birthDate.split('-')
        const newDate = new Date(
            parseInt(yearBirth), 
            parseInt(monthBirth), 
            parseInt(dayBirth)
        );

        const today = new Date();
        const age = today.getFullYear() - newDate.getFullYear();
        const month = today.getMonth() - newDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < newDate.getDate())) {
            return age - 1;
        }
        return age;
    }
}