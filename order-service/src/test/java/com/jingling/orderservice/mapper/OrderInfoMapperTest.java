package com.jingling.orderservice.mapper;

import com.jingling.orderservice.po.OrderInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

import static org.junit.Assert.*;

/**
 * @auther: finalcola-zyy
 * @Date: 2018/3/27 21:30
 * @Description:
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderInfoMapperTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private OrderInfoMapper orderInfoMapper;

    private static Random random = new Random();

    public static String getDes() {
        String[] strings = {"一般，还好", "好评", "暂无", "暂无评价", "回收员态度很好", "该用户没有进行评价"};
        int i = random.nextInt(strings.length);
        return strings[i];
    }

    public static BigInteger getBigInteger() {
        int i = random.nextInt(100000000);
        return new BigInteger(String.valueOf(i));
    }

    public static BigDecimal getBigDecimal(int l,int r) {
        int a = random.nextInt(l);
        int b = random.nextInt(r);
        String s = a + "." + b;
        return new BigDecimal(s);
    }

    public static String getRandomBool() {
        boolean b = random.nextBoolean();
        if (b) {
            return "1";
        } else {
            return "2";
        }
    }

    public static OrderInfo createOrderInfo(){
        long currentTimeMillis = System.currentTimeMillis();
        Timestamp now = new Timestamp(currentTimeMillis);
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setAddressId(getBigInteger());
        orderInfo.setCreateTime(now);
        orderInfo.setUpdateTime(now);
        orderInfo.setDescription(getDes());
        orderInfo.setOrderAmount(getBigDecimal(800,99));
        orderInfo.setOrderStatus(getRandomBool());
        orderInfo.setPaid(true);
        orderInfo.setPayType("1");
        orderInfo.setUserId(getBigInteger());
        orderInfo.setRecyclerId(getBigInteger());
        return orderInfo;
    }

    @Test
    public void save() throws Exception {
        for (int i = 0; i < 50; i++) {
            OrderInfo orderInfo = createOrderInfo();
//        orderInfo.setOrderId(new BigInteger("1111"));
            orderInfoMapper.save(orderInfo);
        }
    }

    @Test
    public void deleteById() throws Exception {
    }

    @Test
    public void getById() throws Exception {
    }

    @Test
    public void listByUserId() throws Exception {
    }

    @Test
    public void listOrder() {
        List<OrderInfo> orderInfos = orderInfoMapper.listOrder("1", 1, 10);
        orderInfos.forEach(System.out::println);
    }

}