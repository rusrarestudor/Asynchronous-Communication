import React from 'react'
import {Bar} from 'react-chartjs-2'

class EaxyChart extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            chartData: this.props.chartData,
            collapseForm: false,
            selected: false
        };
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
    }

    render(){
    return <div>
        <Bar
            data={{
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 , 21 , 22, 23],
                datasets: [{
                    label: '# of votes',
                    data: this.state.chartData,
                }],
            }}
            height={200}
            width={600}
        />
    </div>
    }
}
export default EaxyChart;