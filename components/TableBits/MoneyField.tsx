import { Collaborator } from '../../interfaces/TabCollaborator.interfaces';

const MoneyField = ({ netSalary }: Collaborator) => {

    const setFormat = (number: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
    return (
        <div>
            <label>{netSalary && setFormat(netSalary)}</label>
        </div>
    )
}

export default MoneyField
