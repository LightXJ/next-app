/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext, SizeType } from './config-provider';
import Item from './item';
import toArray from './to-array';
import './index.sass'
import useFlexGapSupport from './use-flex-gap-support';

export interface Option {
  keepEmpty?: boolean;
}

export const SpaceContext = React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

export type SpaceSize = SizeType | number;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = props=>{
  const { getPrefixCls, space, direction: directionConfig } = React.useContext(ConfigContext);
  const {
    size = space?.size || 'small',
    align,
    className,
    children,
    direction = 'horizontal',
    split,
    style,
    wrap = false,
    ...otherProps
  } = props;

  const supportFlexGap = useFlexGapSupport();
  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]).map(item =>
        getNumberSize(item),
      ),
    [size],
  );
  const childNodes = toArray(children, {keepEmpty: true});
  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const prefixCls: string = getPrefixCls('space');

  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const itemClassName = `${prefixCls}-item`;
  const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map((child: any, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    const key = (child && child.key) as string || `${itemClassName}-${i}`;

    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={i}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const spaceContext = React.useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex, supportFlexGap }),
    [horizontalSize, verticalSize, latestIndex, supportFlexGap],
  );

 // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  const gapStyle: React.CSSProperties = {};

  if (wrap) {
    gapStyle.flexWrap = 'wrap';

    if (!supportFlexGap) {
      gapStyle.marginBottom = -verticalSize;
    }
  }

  if (supportFlexGap) {
    gapStyle.columnGap = horizontalSize;
    gapStyle.rowGap = verticalSize;
  }

  return (
    <div
      className={cn}
      style={{
        ...gapStyle,
        ...style,
      }}
      {...otherProps}
    >
      <SpaceContext.Provider value={spaceContext}>{nodes}</SpaceContext.Provider>
    </div>
  );

}

export default Space;