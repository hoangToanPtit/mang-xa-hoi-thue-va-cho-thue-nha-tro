package com.example.socialNetwork.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "post")
public class PostEntity extends AuditEntity{
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;

	@Column
	private String roomType;
	
	@Column
	private Long amount;
	
	@Column
	private Long capacity;	

	@Column
	private String gender;	
	
	@Column
	private Long size;
	
	@Column
	private Long rentPrice;

	@Column
	private Long deposit;

	@Column
	private Long electricityPrice;

	@Column
	private Long internetPrice;
	
	@Column
	private Long waterPrice;

	@Column
	private Long parkingFee;

//	location
	@Column
	private String province;

	@Column
	private String district;
	
	@Column
	private String wards;
	
	@Column
	private String streetName;
	
	@Column
	private String houseNumber;	
	
	
// confirm
	@Column
	private String phoneNumber;

	@Column
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
//	@Column
//	@CreatedDate
//	private Date createdDate;
//	
//	@Column
//	@LastModifiedDate
//	private Date modifiedDate;

// utilities
	@Column
	private Integer conditioner;

	@Column
	private Integer privateWc;
	
	@Column
	private Integer parking;
	
	@Column
	private Integer wifi;
	
	@Column
	private Integer freedom;
	
	@Column
	private Integer keyy;
	
	@Column
	private Integer bed;
	
	@Column
	private Integer kitchen;
	
	@Column
	private Integer pet;
	
	@Column
	private Integer guard;
	
	@Column
	private Integer closet;
	
	@Column
	private Integer tablee;
	
	@Column
	private Integer windoww;
	
	@Column
	private Integer refrigerator;
	
	@Column
	private Integer waterHeater;
	
	//Posts belong to the topic
	@ManyToOne()
	@JoinColumn(name= "topic_id", nullable = false)
	private TopicEntity topic;
	
	
	// user create post	
	@ManyToOne()
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity authorUser;
	

	// user likes post	
	@ManyToMany()
	@JoinTable(name ="post_like",
	joinColumns = @JoinColumn(name = "post_id"),
	inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<UserEntity> userLikes = new ArrayList<>();

	
	// user saves post	
	@ManyToMany()
	@JoinTable(name ="post_save",
	joinColumns = @JoinColumn(name = "post_id"),
	inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<UserEntity> userSaves = new ArrayList<>();	
	
	// post has N comments	
	@OneToMany(cascade =CascadeType.ALL, mappedBy = "post")
	private List<CommentEntity> comments = new ArrayList<>();
	
	// post has N images	
//	cascade = { CascadeType.REMOVE }, 
	@OneToMany(cascade = { CascadeType.REMOVE }, mappedBy = "post")
//	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ImageEntity> images = new ArrayList<>();
	
	
	// post has N comments	
//	@OneToMany(cascade =CascadeType.ALL, mappedBy = "post")
//	private List<NotificationEntity> notifications = new ArrayList<>();
	
	
//	getter and setter
	public Long getId() {
		return id;
	}




	public Integer getConditioner() {
		return conditioner;
	}




	public Integer getPrivateWc() {
		return privateWc;
	}




	@Override
	public String toString() {
		return "PostEntity [id=" + id + ", capacity=" + capacity + ", gender=" + gender + ", rentPrice=" + rentPrice
				+ ", electricityPrice=" + electricityPrice + ", waterPrice=" + waterPrice + ", province=" + province
				+ "]";
	}




	public Integer getParking() {
		return parking;
	}




	public Integer getWifi() {
		return wifi;
	}




	public Integer getFreedom() {
		return freedom;
	}




	public Integer getKeyy() {
		return keyy;
	}




	public Integer getBed() {
		return bed;
	}




	public Integer getKitchen() {
		return kitchen;
	}




	public Integer getPet() {
		return pet;
	}




	public Integer getGuard() {
		return guard;
	}




	public Integer getCloset() {
		return closet;
	}




	public Integer getTablee() {
		return tablee;
	}




	public Integer getWindoww() {
		return windoww;
	}




	public Integer getRefrigerator() {
		return refrigerator;
	}




	public Integer getWaterHeater() {
		return waterHeater;
	}




	public void setConditioner(Integer conditioner) {
		this.conditioner = conditioner;
	}




	public void setPrivateWc(Integer privateWc) {
		this.privateWc = privateWc;
	}




	public void setParking(Integer parking) {
		this.parking = parking;
	}




	public void setWifi(Integer wifi) {
		this.wifi = wifi;
	}




	public void setFreedom(Integer freedom) {
		this.freedom = freedom;
	}




	public void setKeyy(Integer key) {
		this.keyy = key;
	}




	public void setBed(Integer bed) {
		this.bed = bed;
	}




	public void setKitchen(Integer kitchen) {
		this.kitchen = kitchen;
	}




	public void setPet(Integer pet) {
		this.pet = pet;
	}




	public void setGuard(Integer guard) {
		this.guard = guard;
	}




	public void setCloset(Integer closet) {
		this.closet = closet;
	}




	public void setTablee(Integer table) {
		this.tablee = table;
	}




	public void setWindoww(Integer windoww) {
		this.windoww = windoww;
	}




	public void setRefrigerator(Integer refrigerator) {
		this.refrigerator = refrigerator;
	}




	public void setWaterHeater(Integer waterHeater) {
		this.waterHeater = waterHeater;
	}




	public TopicEntity getTopic() {
		return topic;
	}




	public void setTopic(TopicEntity topic) {
		this.topic = topic;
	}




	public String getDescription() {
		return description;
	}




	public Long getAmount() {
		return amount;
	}




	public Long getSize() {
		return size;
	}




	public Date getCreatedDate() {
		return createdDate;
	}




	public Date getModifiedDate() {
		return modifiedDate;
	}




	public UserEntity getAuthorUser() {
		return authorUser;
	}




	public List<UserEntity> getUserLikes() {
		return userLikes;
	}




	public List<UserEntity> getUserSaves() {
		return userSaves;
	}




	public List<CommentEntity> getComments() {
		return comments;
	}




	public List<ImageEntity> getImages() {
		return images;
	}


	public void setDescription(String description) {
		this.description = description;
	}




	public void setAmount(Long amount) {
		this.amount = amount;
	}




	public void setSize(Long size) {
		this.size = size;
	}




	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}




	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}




	public String getRoomType() {
		return roomType;
	}




	public Long getCapacity() {
		return capacity;
	}




	public String getGender() {
		return gender;
	}




	public Long getRentPrice() {
		return rentPrice;
	}




	public Long getDeposit() {
		return deposit;
	}




	public Long getElectricityPrice() {
		return electricityPrice;
	}




	public Long getInternetPrice() {
		return internetPrice;
	}




	public Long getWaterPrice() {
		return waterPrice;
	}




	public Long getParkingFee() {
		return parkingFee;
	}




	public String getProvince() {
		return province;
	}




	public String getDistrict() {
		return district;
	}




	public String getWards() {
		return wards;
	}




	public String getStreetName() {
		return streetName;
	}




	public String getHouseNumber() {
		return houseNumber;
	}




	public String getTitle() {
		return title;
	}




	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}




	public void setCapacity(Long capacity) {
		this.capacity = capacity;
	}




	public void setGender(String gender) {
		this.gender = gender;
	}




	public void setRentPrice(Long rentPrice) {
		this.rentPrice = rentPrice;
	}




	public void setDeposit(Long deposit) {
		this.deposit = deposit;
	}




	public void setElectricityPrice(Long electricityPrice) {
		this.electricityPrice = electricityPrice;
	}




	public void setInternetPrice(Long internetPrice) {
		this.internetPrice = internetPrice;
	}




	public void setWaterPrice(Long waterPrice) {
		this.waterPrice = waterPrice;
	}




	public void setParkingFee(Long parkingFee) {
		this.parkingFee = parkingFee;
	}




	public void setProvince(String province) {
		this.province = province;
	}




	public void setDistrict(String district) {
		this.district = district;
	}




	public void setWards(String wards) {
		this.wards = wards;
	}




	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}




	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}



	public void setTitle(String title) {
		this.title = title;
	}




	public String getPhoneNumber() {
		return phoneNumber;
	}




	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}




	public void setAuthorUser(UserEntity authorUser) {
		this.authorUser = authorUser;
	}




	public void setUserLikes(List<UserEntity> userLikes) {
		this.userLikes = userLikes;
	}




	public void setUserSaves(List<UserEntity> userSaves) {
		this.userSaves = userSaves;
	}




	public void setComments(List<CommentEntity> comments) {
		this.comments = comments;
	}




	public void setImages(List<ImageEntity> images) {
		this.images = images;
	}
	
	
	
}
