import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';

class VerticalTimelineElement extends Component {
  constructor(props) {
    super(props);
    this.onVisibilitySensorChange = this.onVisibilitySensorChange.bind(this);
    this.state = { visible: false };
  }

  onVisibilitySensorChange(isVisible) {
    if (isVisible) {
      this.setState({ visible: true });
    }
  }

  render() {
    const {
      id,
      children,
      classes = {},
      before,
      after,
      icon,
      iconStyle,
      iconOnClick,
      date,
      dateStyle,
      position,
      style,
      className,
      visibilitySensorProps,
    } = this.props;

    const { visible } = this.state;

    return (
      <div
        id={id}
        className={classNames(
          className,
          classes.root,
          'vertical-timeline-element',
          {
            'vertical-timeline-element--left': position === 'left',
            'vertical-timeline-element--right': position === 'right',
            'vertical-timeline-element--no-children': children === '',
          },
        )}
        style={style}
      >
        <VisibilitySensor
          {...visibilitySensorProps}
          onChange={this.onVisibilitySensorChange}
        >
          <div>
            {before}
            <span // eslint-disable-line jsx-a11y/no-static-element-interactions
              style={iconStyle}
              onClick={iconOnClick}
              className={classNames(
                classes.icon,
                'vertical-timeline-element-icon',
                {
                  'bounce-in': visible,
                  'is-hidden': !visible,
                },
              )}
            >
              {icon}
            </span>
            <div
              style={dateStyle}
              className={classNames(
                classes.date,
                'vertical-timeline-element-content',
                {
                  'bounce-in': visible,
                  'is-hidden': !visible,
                },
              )}
            >
              {children}
              <span
                className={classNames(
                  classes.dateText,
                  'vertical-timeline-element-date',
                )}
              >
                {date}
              </span>
            </div>
            {after}
          </div>
        </VisibilitySensor>
      </div>
    );
  }
}

VerticalTimelineElement.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  before: PropTypes.node,
  after: PropTypes.node,
  classes: PropTypes.shape({}),
  className: PropTypes.string,
  icon: PropTypes.element,
  iconStyle: PropTypes.shape({}),
  iconOnClick: PropTypes.func,
  style: PropTypes.shape({}),
  date: PropTypes.node,
  dateStyle: PropTypes.shape({}),
  position: PropTypes.string,
  visibilitySensorProps: PropTypes.shape({}),
};

VerticalTimelineElement.defaultProps = {
  id: '',
  children: '',
  before: null,
  after: null,
  classes: undefined,
  className: '',
  icon: null,
  iconStyle: null,
  style: null,
  date: '',
  dateStyle: null,
  position: '',
  iconOnClick: null,
  visibilitySensorProps: { partialVisibility: true, offset: { bottom: 80 } },
};

export default VerticalTimelineElement;
