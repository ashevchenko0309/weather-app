import React from 'react'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class PickerTemperature extends React.Component {
    render = () =>{
        const Handle = Slider.Handle;
        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props;
            return (
                <Tooltip
                    prefixCls="rc-slider-tooltip"
                    overlay={value}
                    visible={dragging}
                    placement="top"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };
        return (
            <Slider min={10} max={35} handle={handle} onAfterChange={this.props.onAfterChange}/>
        )
    }

}
export default PickerTemperature