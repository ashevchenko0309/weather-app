import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as TooltipChart} from 'recharts';

class AmountOfRainfall extends React.Component {
    render = () => {
        return (
            <ResponsiveContainer>
                <BarChart width={600} height={300} data={this.props.data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="day"/>
                    <YAxis label={{ value: "1/m^2", angle: -90, position: 'insideLeft' }}/>
                    <TooltipChart/>
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default AmountOfRainfall