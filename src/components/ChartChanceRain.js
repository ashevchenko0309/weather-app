import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as TooltipChart} from 'recharts';

class ChartChanceRain extends React.Component {
    render = () => {
        return (
            <ResponsiveContainer>
                <AreaChart data={this.props.data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <TooltipChart/>
                    <Area type='monotone' dataKey='upperBound' stroke='#ffc658' fill='#ffc658' />
                    <Area type='monotone' dataKey='mean' stroke='#8884d8' fill='#8884d8'  />
                    <Area type='monotone' dataKey='lowerBound' stroke='#28a745' fill='#28a745' />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}

export default ChartChanceRain
